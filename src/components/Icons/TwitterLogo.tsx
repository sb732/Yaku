import Image from 'next/image';
import logo from '../../assets/images/icons/twitter.svg';

const TwitterLogo = ({ size = 24 }: { size?: number | `${number}` }) => (
  <Image
    src={logo}
    alt='Twitter'
    width={size}
    height={size}
    style={{ objectFit: 'contain' }}
  />
);

export default TwitterLogo;
