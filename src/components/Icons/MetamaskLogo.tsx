import logo from '../../assets/images/icons/metamask.svg';
import Image from 'next/image';

const MetamaskLogo = ({ size = 24 }: { size?: number | `${number}` }) => (
  <Image
    src={logo}
    alt='Metamask'
    width={size}
    height={size}
    style={{ objectFit: 'contain' }}
  />
);

export default MetamaskLogo;
