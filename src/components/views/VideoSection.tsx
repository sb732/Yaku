import Image from 'next/image';
import VideoSlidesBackground from '@/components/views/VideoSlidesBackground';
import { useRequests } from '../../hooks/useRequests';
import BannerSpace from '@/components/views/BannerSpace';

import unreal from '../../assets/images/partners/Unreal_Engine_Logo.png';
import epic from '../../assets/images/partners/Epic_Games_logo.png';
import { useRequest } from 'ahooks';
export const VideoSection = () => {
  const { yaku: { getDashboardSlides } } = useRequests();
  const { data: dashboardSlides, loading: isLoading } =
    useRequest(getDashboardSlides);

  return (
    <div className={`w-screen h-screen flex mb-1 video-main`}>
      <VideoSlidesBackground {...dashboardSlides} />
      <div className='w-full grid'>
        <BannerSpace
          title='Craft Your Reality.'
          title2=''
          description='Bring Gaming to the people. Action MMORPG set in a Fantasy/Cyberpunk Japanese universe. Sustained by real blockchain-based economy, ascend from mortals to Kami & Fight for Territory and Resource Control.'
        />

        <div className='z-10'>
          <div className='flex flex-row items-center'>
            <div className='pb-14 sm:pb-32 w-full sm:max-w-xl max-w-lg m-auto'>
              <div className='opacity-50 m-auto max-w-7xl px-6 lg:px-8'>
                <div className='m-auto mt-16 grid max-w-lg grid-cols-1 md:grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0'>
                  <Image
                    className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                    src={epic}
                    alt='Reform'
                    width='158'
                    height='48'
                  />
                  <Image
                    className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                    src={unreal}
                    alt='Tuple'
                    width='158'
                    height='48'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};