/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import MissionItem from '@/components/missions/MissionItem';
import useAuth from '@/hooks/useAuth';
import { useRequests } from '@/hooks/useRequests';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import {
  List,
  Navbar,
  NavbarBackLink,
  Page,
  Tabbar,
  TabbarLink,
} from 'konsta/react';
import { useEffect, useState } from 'react';

export default function Missions() {
  const [activeTab, setActiveTab] = useState('new');
  const { yakuProfile } = useAuth();

  const {
    missions: { list: listMissions },
  } = useRequests();

  const {
    data: { missions, entries } = { missions: [], entries: [] },
    loading: isLoading,
    runAsync,
  } = useRequest(listMissions, {
    manual: true,
  });

  useEffect(() => {
    runAsync({
      user: yakuProfile?._id,
    });
  }, [yakuProfile?._id]);

  return (
    <Page
      className='pt-[80px]'
      colors={{ bgIos: 'bg-background', bgMaterial: 'bg-background' }}
    >
      <Navbar
        left={<NavbarBackLink text='Back' onClick={() => history.back()} />}
        title='List of missions'
        className='text-white'
        colors={{ bgIos: 'bg-background', bgMaterial: 'bg-background' }}
        translucent
        centerTitle
      ></Navbar>
      <Tabbar
        labels={true}
        icons={false}
        className='[&>div:first-child]:!bg-background [&>span]:!bg-black'
      >
        <TabbarLink
          active={false}
          onClick={() => setActiveTab('new')}
          label='New'
          className={`mx-4 [&>span]:!text-white bg-background border-white ${
            activeTab === 'new' ? '!border-b-2' : ''
          }`}
        />
        <TabbarLink
          active={false}
          onClick={() => setActiveTab('ongoing')}
          label='Ongoing/Done'
          className={`mx-4 [&>span]:!text-white bg-background border-white ${
            activeTab === 'ongoing' ? '!border-b-2' : ''
          }`}
        />
      </Tabbar>
      {activeTab === 'new' && (
        <List className='px-2'>
          {missions
            ?.filter(
              (mission: any) =>
                !entries?.find((entry: any) => entry.mission === mission._id) &&
                dayjs(mission.endDT).isAfter(dayjs())
            )
            ?.map((mission: any, index: number) => (
              <MissionItem key={`mission-${index}`} mission={mission} />
            ))}
        </List>
      )}
      {activeTab === 'ongoing' && (
        <List className='px-2'>
          {missions
            ?.filter(
              (mission: any) =>
                entries?.find((entry: any) => entry.mission === mission._id) ||
                !dayjs(mission.endDT).isAfter(dayjs())
            )
            ?.map((mission: any, index: number) => (
              <MissionItem key={`mission-${index}`} mission={mission} />
            ))}
        </List>
      )}
    </Page>
  );
}
