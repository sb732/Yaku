const LOGO_BLACK = 'https://s3.amazonaws.com/img.yaku.ai/logos/Logo2K.png';

const YakuIcon = ({
  cssClass = 'h-12 w-12 mr-2 rounded-2xl object-cover yaku-icon',
  icon = LOGO_BLACK,
}: // eslint-disable-next-line @next/next/no-img-element
any) => <img className={cssClass} src={icon} alt='Yaku' />;

export default YakuIcon;
