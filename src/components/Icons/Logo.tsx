// material-ui
import Image from 'next/image';

const LOGO = `https://s3.amazonaws.com/img.yaku.ai/logos/X-YAKU.png`;

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ alt = 'Yaku Labs' }: any) => (
  <div className='w-[170px] flex relative h-full'>
    <Image src={LOGO} alt={alt} fill style={{ objectFit: 'contain' }} />
  </div>
);

export default Logo;
