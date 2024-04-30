import dayjs from 'dayjs';
export const FooterSection = () => {
  return (
    <div className='max-md:mb-14 w-full pb-2'>
      <p className='text-[10px] px-2 text-center w-full'>
        © {dayjs().get('y')} Yakushima Corp. All right reserved.
      </p>
    </div>
  );
};