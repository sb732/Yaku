'use client';
export const runtime = 'edge';

import {
  Block,
  BlockHeader,
  BlockTitle,
  Button,
  Card,
  List,
  ListGroup,
  ListItem,
  Navbar,
  NavbarBackLink,
  Page,
  Popup,
} from 'konsta/react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import YakuIcon from '@/components/Icons/YakuIcon';
import RaceItem from '@/components/missions/RaceItem';
import { Duration } from '@/components/missions/Duration';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatars } from '@/components/missions/Avatars';
import { AvatarData } from '@/types/mission';
import { SkillBar } from '@/components/missions/SkillBar';
import AvatarCard from '@/components/cards/AvatarCard';

import './page.module.css';
import { useRequest } from 'ahooks';
import { useRequests } from '@/hooks/useRequests';
import useAuth from '@/hooks/useAuth';
import { forEach, get, groupBy, map, min } from 'lodash';
import { YAKUX_COLLECTION } from '@/configs';
import dayjs from 'dayjs';
import useNotification from '@/hooks/useNotification';
import { AxiosError } from 'axios';

const MissionDetail = ({ params }: { params: { id: string } }) => {
  const {
    missions: { getById, join: joinMission, roll },
  } = useRequests();
  const { avatar, staked, yakuProfile } = useAuth();
  const {
    data: { mission, entry } = { mission: {}, entry: undefined },
    loading: isLoading,
  } = useRequest(getById, {
    defaultParams: [params.id, yakuProfile?.wallet],
    onSuccess: (data: any) => {
      setAvatars(
        data.entry
          ? map(data.entry.avatars, (mint) => ({
              mint,
              image: staked?.find((itm: any) => itm.mint === mint)?.image,
              health: 1,
              count: 1,
            }))
          : map(Array(data?.mission?.requirement?.avatars?.max ?? 1), (i) => ({
              health: 0,
              count: 0,
            }))
      );
    },
    onError: (e) => {
      handleError({ subtitle: 'Error', text: 'Fail loading mission.' });
    },
  });
  const { data: newEntry, run: handleJoinMission } = useRequest(joinMission, {
    manual: true,
    onError: (e: any) => {
      console.log(e);
      handleError({ subtitle: 'Error', text: e?.response?.data?.message });
    },
  });
  const { data: rollResult, run: handleRoll } = useRequest(roll, {
    manual: true,
    onSuccess: (data: any) => {
      setShowCongratz(data.success);
    },
    onError: (e: any) => {
      handleError({ subtitle: 'Error', text: e?.response?.data?.message });
    },
  });
  const { setNotification, setShowNotify } = useNotification();
  const handleError = ({
    subtitle,
    text,
  }: {
    subtitle: string;
    text: string;
  }) => {
    setNotification({
      subtitle,
      text,
    });
    setShowNotify(true);
  };
  const [timer, setTimer] = useState<number>(-1);
  const [showCongratz, setShowCongratz] = useState<boolean>(false);
  const [isAvatarSelection, setIsAvatarSelection] = useState<boolean>(false);
  const [popupShown, setPopupShown] = useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [avatars, setAvatars] = useState<AvatarData[]>([]);
  const [myAvatars, setMyAvatars] = useState<AvatarData[]>(
    map(
      groupBy(staked, 'collection')?.[YAKUX_COLLECTION],
      ({ image, name, mint }: any) => ({
        image,
        name,
        health: 1,
        count: 1,
        mint,
      })
    )
  );

  // whether the user have all the requirements or not
  const isSatisfied = useMemo(() => {
    if (avatar && avatar.level >= mission?.requirement?.level?.min) {
      return true;
    }
  }, [avatar]);

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      if (!!avatars[cardIndex].image) {
        return;
      }
      console.log({ cardIndex });
      setClickedIndex(cardIndex);
      setPopupShown(true);
    },
    [avatars]
  );

  const onSelectAvatar = useCallback(
    (selectedIndex: number) => {
      // update avatars
      const clonedAvatars = [...avatars];
      clonedAvatars[clickedIndex] = JSON.parse(
        JSON.stringify(myAvatars[selectedIndex])
      );
      setAvatars(clonedAvatars);

      // update user's avatars
      myAvatars.splice(selectedIndex, 1);
      setMyAvatars([...myAvatars]);
      setPopupShown(false);
    },
    [clickedIndex, myAvatars, avatars]
  );

  const calculate = () => {
    if (mission && mission.requirement) {
      let score = 0;
      forEach(mission.requirement, ({ min, multiplier }, key) => {
        let value = get(avatar, key, 0);
        if (key === 'avatars')
          value = avatars.filter(({ mint }: any) => !!mint).length;
        if ((min && value >= min) || (!min && value > 0)) {
          score += value * multiplier;
        }
      });
      return {
        possibility: min([score, 100]),
      };
    }
    return { possibility: 0 };
  };
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    if ((entry || newEntry) && mission) {
      const interval = (intervalRef.current = setInterval(() => {
        if (
          dayjs().diff(dayjs(entry.entryDT || newEntry.entryDT), 's') <
          mission.duration
        ) {
          setTimer(
            mission.duration -
              dayjs().diff(dayjs(entry.entryDT || newEntry.entryDT), 's')
          );
        }
      }, 1000));
      return () => {
        clearInterval(interval);
      };
    }
  }, [entry, newEntry]);
  return (
    <Page
      className='pt-[80px]'
      colors={{ bgIos: 'bg-background', bgMaterial: 'bg-background' }}
    >
      {!isLoading && !!mission?.images?.background && (
        <div className='bg-container'>
          <Image
            src={mission.images?.background}
            layout='fill'
            objectFit='cover'
            alt='mission-background'
            className='brightness-50'
          />
        </div>
      )}
      <Navbar
        left={
          <NavbarBackLink
            text='Back'
            onClick={() =>
              isAvatarSelection ? setIsAvatarSelection(false) : history.back()
            }
          />
        }
        title={`${isLoading ? 'Mission Detail' : mission?.name ?? 'Unknown'}`}
        className='text-white'
        colors={{ bgIos: 'bg-transparent', bgMaterial: 'bg-transparent' }}
        translucent
        centerTitle
      ></Navbar>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !!mission && (
          <>
            <Block>
              <BlockTitle
                className='text-center !block'
                colors={{
                  textIos: 'text-slate-300',
                  textMaterial: 'text-slate-300',
                }}
              >
                {mission.description ?? 'Description'}
              </BlockTitle>
              <BlockHeader className='text-center !block'>
                {mission.location ?? 'Location'}
              </BlockHeader>

              {!isAvatarSelection && (
                <Block className='my-4'>
                  <List className='px-3 py-2 rounded-xl bg-zinc-800'>
                    <ListItem
                      className='border-b-[1px]'
                      media={undefined}
                      title={
                        <span className='strong text-white font-bold'>
                          Reward
                        </span>
                      }
                      after={
                        <span className='strong text-white text-[16px] font-bold flex items-center'>
                          {mission.rewardAmount ?? 0}
                          {mission.rewardType === 'YAKU' && (
                            <YakuIcon cssClass='ml-2 h-[20px] w-[20px]' />
                          )}{' '}
                          {mission.rewardType === 'XP' && 'XP'}
                        </span>
                      }
                    ></ListItem>
                    <ListItem
                      media={undefined}
                      title={
                        <span className='strong text-white font-bold'>
                          Duration
                        </span>
                      }
                      after={
                        <span className='strong text-white font-bold text-[16px]'>
                          <Duration
                            isCompleted={mission.isCompleted}
                            duration={mission.duration}
                          />
                        </span>
                      }
                    ></ListItem>
                  </List>

                  <List className='px-3 py-2 rounded-xl bg-zinc-800'>
                    <ListGroup>
                      <ListItem
                        colors={{
                          groupTitleBgIos: 'bg-zinc-800',
                          groupTitleBgMaterial: 'bg-zinc-800',
                        }}
                        title='Requirements'
                        className='text-white font-bold mb-2'
                      />
                      {mission.requirement?.level?.min > 0 && (
                        <ListItem
                          media={undefined}
                          title={
                            <span className='strong text-white font-bold text-[12px]'>
                              Levels
                            </span>
                          }
                          after={
                            <span className='strong text-white font-bold text-[16px]'>
                              {mission.requirement?.level?.min ?? 0}
                            </span>
                          }
                        />
                      )}
                      {mission.requirement?.races && (
                        <ListItem
                          media={undefined}
                          title={
                            <span className='strong text-white font-bold text-[12px]'>
                              Races
                            </span>
                          }
                          after={
                            <div className='flex'>
                              {(mission.requirement?.races ?? []).map(
                                (item: any, index: number) => (
                                  <RaceItem
                                    key={`race-${index}`}
                                    image={item.image}
                                    count={item.count}
                                    imgAlt={item.name}
                                    className='ml-2'
                                  />
                                )
                              )}
                            </div>
                          }
                        />
                      )}
                      {mission.requirement?.accessories && (
                        <ListItem
                          media={undefined}
                          title={
                            <span className='strong text-white font-bold text-[12px]'>
                              Accessories
                            </span>
                          }
                          after={
                            <div className='flex'>
                              {(mission.requirement?.accessories ?? []).map(
                                (item: any, index: number) => (
                                  <RaceItem
                                    key={`accessory-${index}`}
                                    image={item.image}
                                    count={item.count}
                                    imgAlt={item.name}
                                    className='ml-2'
                                  />
                                )
                              )}
                            </div>
                          }
                        />
                      )}
                    </ListGroup>
                  </List>
                </Block>
              )}
            </Block>
            {!isAvatarSelection && (
              <Block>
                <div className='flex justify-center'>
                  <Button
                    className='max-w-[60%]'
                    colors={{
                      fillBgIos: 'bg-zinc-800',
                      fillBgMaterial: 'bg-zinc-800',
                    }}
                    large
                    rounded
                    disabled={!isSatisfied}
                    onClick={() => {
                      if (isSatisfied) {
                        // Pop up the avatar selection part
                        setIsAvatarSelection(true);
                      }
                    }}
                  >
                    {isSatisfied ? 'Continue' : 'BUY'}
                  </Button>
                </div>
                {!isSatisfied && (
                  <div className='text-center text-white w-full mt-3'>
                    You miss x Workers or Accessories + CTA
                  </div>
                )}
              </Block>
            )}
          </>
        )
      )}

      {isAvatarSelection && (
        <>
          <Block className='flex'>
            <Card
              colors={{ bgIos: 'bg-zinc-700', bgMaterial: 'bg-zinc-700' }}
              margin='mx-2 my-4'
            >
              <div className='text-white mb-3'>Success</div>
              <span className='text-white text-5xl md:text-6xl'>
                {calculate()?.possibility}%
              </span>
            </Card>
            <Card
              colors={{ bgIos: 'bg-zinc-700', bgMaterial: 'bg-zinc-700' }}
              margin='mx-2 my-4'
              className='grow'
            >
              <div className='text-white mb-3'>Recommended Skills</div>
              <SkillBar label='Attack' percent={1} />
              <SkillBar label='Defence' percent={1} />
              <SkillBar label='Stealth' percent={1} />
            </Card>
          </Block>
          <Block>
            <Avatars avatars={avatars} onCardClick={handleCardClick} />
          </Block>
          <Block>
            {!rollResult && !entry?.completedDT && !newEntry?.completedDT && (
              <div className='flex mb-2 justify-center'>
                <Button
                  className='max-w-[60%]'
                  colors={{
                    fillBgIos: 'bg-zinc-800',
                    fillBgMaterial: 'bg-zinc-800',
                  }}
                  large
                  rounded
                  disabled={!!entry || !!newEntry}
                  onClick={() => {
                    handleJoinMission(
                      params.id,
                      yakuProfile._id,
                      yakuProfile.wallet,
                      avatars.map(({ mint }: any) => mint)
                    );
                  }}
                >
                  {!!entry || !!newEntry ? 'JOINED' : 'START'}
                </Button>
              </div>
            )}
            {!rollResult && !entry?.completedDT && !newEntry?.completedDT && (
              <div className='flex justify-center'>
                <Button
                  className='max-w-[60%]'
                  colors={{
                    fillBgIos: 'bg-zinc-800',
                    fillBgMaterial: 'bg-zinc-800',
                  }}
                  disabled={(!entry && !newEntry) || timer > 0}
                  large
                  rounded
                  onClick={() => {
                    handleRoll(params.id, yakuProfile._id, yakuProfile.wallet);
                  }}
                >
                  {(entry || newEntry) && timer < mission.duration && timer > 0
                    ? `${Math.floor(timer / 3600)}:${Math.floor(
                        (timer % 3600) / 60
                      )}:${timer % 60} remains`
                    : 'Roll'}
                </Button>
              </div>
            )}
            {(rollResult || entry?.completedDT || newEntry?.completedDT) && (
              <div className='flex justify-center'>
                <Button
                  className='max-w-[60%]'
                  colors={{
                    fillBgIos: 'bg-zinc-800',
                    fillBgMaterial: 'bg-zinc-800',
                  }}
                  disabled
                  large
                  rounded
                >
                  Completed
                </Button>
              </div>
            )}
          </Block>
        </>
      )}

      <Popup
        opened={popupShown}
        onBackdropClick={() => setPopupShown(false)}
        size='w-screen h-[80%] max-w-[400px] md:w-[420px] md:h-[800px]'
        className='md:rounded-none'
      >
        <Page colors={{ bgIos: 'bg-zinc-900', bgMaterial: 'bg-zinc-900' }}>
          <div className='px-2 py-4'>
            {myAvatars.map((myAvatar, index) => (
              <AvatarCard
                key={`my-avatar-${index}`}
                sqaure={false}
                truncate={false}
                image={myAvatar.image}
                onClick={() => onSelectAvatar(index)}
                noImg={false}
                count={myAvatar.count}
                cssClass='!bg-zinc-800 w-[45%] m-2 inline-block'
              >
                <SkillBar label='Health' percent={myAvatar.health} />
              </AvatarCard>
            ))}
          </div>
        </Page>
      </Popup>
    </Page>
  );
};

export default MissionDetail;
