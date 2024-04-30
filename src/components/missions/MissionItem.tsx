import { MissionData } from '@/types/mission';
import { ListItem } from 'konsta/react';
import Image from 'next/image';
import RaceItem from './RaceItem';
import { Duration } from './Duration';
import dayjs from 'dayjs';

interface MissionProps {
  mission: MissionData;
}

const MissionItem: React.FC<MissionProps> = ({ mission }: MissionProps) => {
  return (
    <ListItem
      className='mx-2 my-2 rounded-xl bg-zinc-800'
      link
      href={`missions/${mission._id}`}
      colors={{ primaryTextMaterial: 'text-white' }}
      media={undefined}
      title={
        <div className='flex items-center'>
          <div className='w-[48px] h-[48px] min-w-[48px] md:w-[60px] md:h-[60px] md:min-w-[60px] relative'>
            {mission.images?.left && (
              <Image
                src={mission.images?.left}
                alt={mission.name}
                className='brightness-50 rounded-full object-cover'
                layout='fill'
              />
            )}
            <span className='absolute md:top-[12px] md:left-[15px] md:text-[24px] top-[10px] left-[13px] text-[20px] font-bold text-white'>
              {mission.requirement.level.min}
            </span>
          </div>
          <span className='text-white font-bold px-4'>{mission.name}</span>
          <span className='text-gray-500 px-2'>
            <Duration
              isCompleted={mission.isCompleted}
              duration={mission.duration}
            />
          </span>
        </div>
      }
      after={
        <div
          className={`w-[48px] h-[48px] min-w-[48px] md:w-[60px] md:min-w-[60px] md:h-[60px] relative`}
        >
          {mission.images?.right && (
            <Image
              src={mission.images?.right}
              alt={mission.name}
              layout='fill'
              className='brightness-50 rounded-md object-cover'
            />
          )}
          <span className='w-[20px] h-[20px] absolute top-[-3px] right-[-3px] font-bold text-black bg-[#c5d674] text-[12px] rounded-full text-center'>
            {mission.requirement.level.min}
          </span>
        </div>
      }
    ></ListItem>
  );
};

export default MissionItem;
