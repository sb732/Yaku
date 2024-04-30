const TowerView = ({ height, type, surface, loading }: any) => {
  return (
    <>
      <div className='grid my-1 justify-between items-center'>
        <div className='flex !p-0 flex-col justify-center items-center'>
          <p className='text-terciary font-bold text-[14px]'>
            {type === 'Tower' ? 'Height' : 'Surface'}
          </p>
          <p className='text-lg font-bold'>
            {`${type === 'Tower' ? height : surface}`}
            {type === 'Tower' ? (
              'm'
            ) : (
              <>
                m<sup>2</sup>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default TowerView;
