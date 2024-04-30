/* eslint-disable @next/next/no-img-element */
import { DEFAULT_BANNER, LOGO_BLACK } from '@/configs';

const ProfileBox = ({
  name,
  description,
  image,
  loading,
  leftTitle,
  rightTitle,
  leftValue,
  rightValue,
  showLeft,
  showRight,
  handleButtonClick,
}: any) => {
  return (
    <section className='profile-box bg-surface rounded-3xl overflow-hidden shadow-sm min-w-[300px]'>
      <div className='banner bg-elevation2'>
        <img
          className='w-full h-full object-cover'
          src={`${DEFAULT_BANNER}`}
          alt='banner'
        />
      </div>

      <div className='p-4 text-center'>
        <div className='flex justify-center'>
          {showLeft && (
            <div className='min-w-[50px]'>
              <button
                type='button'
                className='text-primary mb-1 bg-transparent text-xl font-bold'
              >
                {leftValue}
              </button>
              <p className='text-terciary text-xs font-medium'>{leftTitle}</p>
            </div>
          )}

          <div className='avatar flex-shrink-0 -mt-14 mx-2 rounded-3xl overflow-hidden shadow-sm'>
            <img
              src={image || LOGO_BLACK}
              className='w-full h-full object-cover'
              alt='avatar'
            />
          </div>

          {showRight && (
            <div className='min-w-[50px]'>
              <button
                type='button'
                className='text-primary mb-1 bg-transparent text-xl font-bold'
              >
                {rightValue}
              </button>
              <p className='text-terciary text-xs font-medium'>{rightTitle}</p>
            </div>
          )}
        </div>

        <div className='px-4 pt-6 border-elevation2'>
          <h3 className='text-primary mb-1 text-base font-bold'>{name}</h3>
          <h3 className='text-primary mb-2 text-base font-normal text-[12px]'>
            {description}
          </h3>
        </div>

        <button
          type='button'
          className='text-secondary bg-elevation2 w-full h-11 mt-3 rounded-xl text-sm font-medium shadow-sm duration-300'
          onClick={handleButtonClick}
        >
          Change Avatar
        </button>
      </div>
    </section>
  );
};

export default ProfileBox;
