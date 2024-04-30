'use client';

import YakuIcon from '@/components/Icons/YakuIcon';
import ProfileBox from '@/components/views/profile-box';
import StatBox from '@/components/views/stat-box';
import { YAKUX_COLLECTION } from '@/configs';
import useAuth from '@/hooks/useAuth';
import useNotification from '@/hooks/useNotification';
import { abbreviateValue } from '@/utils';
import { IconDna } from '@tabler/icons-react';
import { Card, Chip } from 'konsta/react';
import { groupBy, map } from 'lodash';

export default function Avatar() {
  const { gameUser, accessToken, token, staked, yakuProfile, avatar } =
    useAuth();
  const { setNotification, setShowNotify } = useNotification();
  const handleChangeAvatar = () => {
    setNotification({
      subtitle: 'Coming soon...',
      text: 'Changing avatar is coming soon.',
    });
    setShowNotify(true);
  };
  return (
    <>
      <Card
        className='!flex gap-4 justify-center items-center !rounded-3xl p-4 mt-[80px] !bg-elevation1'
        contentWrap={false}
      >
        <ProfileBox
          name={yakuProfile.vanity}
          description=''
          image={yakuProfile.avatar}
          showLeft={true}
          leftTitle='Level'
          leftValue={abbreviateValue(avatar?.level || 1)}
          showRight={true}
          rightTitle='Exp'
          rightValue={abbreviateValue(avatar?.XP || 0)}
          handleButtonClick={handleChangeAvatar}
        />
        <StatBox
          stat={avatar?.stat || { str: 1, dex: 1, int: 1, hp: 10, sp: 10 }}
        />
      </Card>
      <Card
        className='!flex gap-4 justify-start items-center !rounded-3xl p-4 mt-[80px] !bg-surface flex-wrap'
        contentWrap={false}
      >
        {map(
          groupBy(staked, 'collection')?.[YAKUX_COLLECTION],
          ({ image, name, attributes }) => (
            <Card>
              <div
                className='ios:-mx-4 ios:-mt-4 h-48 w-[200px] p-4 flex items-start text-white justify-end ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]'
                style={{
                  backgroundImage: `url(${image})`,
                }}
              ></div>
              <div className='text-primary mb-3'>
                <Chip
                  className='!px-1 w-7 mr-2'
                  media={
                    <YakuIcon cssClass='h-5 w-5 ml-3 rounded-full object-contain' />
                  }
                ></Chip>
                {name}
              </div>
              <p className='text-right'>
                <Chip media={<IconDna size={16} className='ml-2' />}>
                  {
                    attributes.find(
                      ({ trait_type }: any) =>
                        trait_type === 'DNA' || trait_type === 'Role'
                    )?.value
                  }
                </Chip>
              </p>
            </Card>
          )
        )}
      </Card>
    </>
  );
}
