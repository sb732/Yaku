import icon from '../../assets/images/icons/ethereum-icon.svg';

const EthereumIcon = ({ cssClass = 'h-7 w-7 mr-1 rounded-full' }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={cssClass} src={icon?.src || icon} alt='Ethereum' />
);

export default EthereumIcon;
