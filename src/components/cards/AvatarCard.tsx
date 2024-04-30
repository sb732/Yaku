/* eslint-disable */

// project-imports
import { Badge, Card, Preloader } from 'konsta/react';
import Image from 'next/image';

const AvatarCard = ({
  image,
  onClick,
  children,
  sqaure = false,
  cssClass = '',
  height = 250,
  noImg = true,
  count
}: any) => {
  return (
    <div
      className={`rounded-lg shadow-none ${cssClass}`}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Card
        colors={{ 'bgIos': 'bg-zinc-800', 'bgMaterial': 'bg-zinc-800'}}
        className={`relative !m-0 flex justify-center items-center ${
          sqaure ? 'aspect-square' : ''
        }`}
        style={{ height: noImg ? height : height - 32, width: sqaure ? height : 'auto' }}
      >
        { 
          !noImg && <Badge 
            className={`absolute top-4 right-4 z-10 !text-sm !md:text-md ${count ? '!px-2' : ''}`}
            colors={{ 'bg': 'bg-zinc-800', 'text': 'text-white'}} small={false}>
            { !!count ? count : 
                <Preloader
                  colors={{ iconIos: 'text-primary', iconMaterial: 'text-primary' }}
                  size={`w-3 h-3`}
                />}
          </Badge>
        }
        <Image src={image} 
          width={noImg ? 60 : undefined}
          height={noImg ? 100 : undefined}
          layout={noImg ? undefined : 'fill'}
          className='p-3 rounded-lg'
          objectFit='cover'
          alt='name'
        />
      </Card>
      {children}
    </div>
  );
};

export default AvatarCard;
