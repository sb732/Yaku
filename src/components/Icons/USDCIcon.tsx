'use client';
import icon from '../../assets/images/icons/usd-coin-usdc-logo.svg';

const USDCIcon = ({ cssClass = 'h-7 w-6 mr-1 rounded-full' }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={cssClass} src={icon.src || icon} alt='USDC' />
);

export default USDCIcon;
