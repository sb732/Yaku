const DetailView = ({ listed, supply }: any) => {
  return (
    <>
      <div className='grid my-1 justify-between items-center'>
        <div className='flex flex-col justify-center items-center !p-0'>
          <p className='text-terciary font-bold text-[14px]'>Listed</p>
          <p className='text-lg font-bold'>
            {listed} / {supply}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailView;
