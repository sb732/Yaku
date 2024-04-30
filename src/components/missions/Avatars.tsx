import { AvatarData } from '@/types/mission';
import SwiperList from '../SwiperList';
import 'swiper/css';
import AvatarCard from '../cards/AvatarCard';
import { SkillBar } from './SkillBar';

export const Avatars = ({
  avatars,
  onCardClick,
}: {
  onCardClick: (index: number) => void;
  avatars: AvatarData[];
}) => {
  return (
    <div className='px-2'>
      <SwiperList
        items={avatars}
        css='pl-4 pt-4'
        components={({ image, health, count, idx }: any) =>
          !!image ? (
            <AvatarCard
              sqaure={false}
              truncate={false}
              image={image}
              onClick={() => onCardClick(idx)}
              noImg={false}
              count={count}
              cssClass='!bg-zinc-800'
            >
              <SkillBar label='Health' percent={health} />
            </AvatarCard>
          ) : (
            <AvatarCard
              sqaure={false}
              truncate={false}
              image={'/images/plus.png'}
              onClick={() => onCardClick(idx)}
              cssClass='!bg-zinc-800'
              noImg
            ></AvatarCard>
          )
        }
        slidesPerView={{
          sm: '2.2',
          md: '3.5',
          lg: '3.5',
        }}
        slidesPerGroup={1}
        spaceBetween='2%'
        slideCss='!h-auto'
      />
    </div>
  );
};
