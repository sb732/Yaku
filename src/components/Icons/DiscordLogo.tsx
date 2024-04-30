// material-ui
import logo from '../../assets/images/icons/discord.svg';
import Image from 'next/image';

const DiscordLogo = ({ size = 24 }: { size?: number | `${number}` }) => (
  <Image
    src={logo?.src || logo}
    alt='Discord'
    width={size}
    height={size}
    style={{ objectFit: 'contain' }}
  />
);

export default DiscordLogo;
