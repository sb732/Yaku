/* eslint-disable */

// project-imports
import { Card, Chip } from 'konsta/react';
import Image from 'next/image';

const ProjectCard = ({
  image,
  name,
  nameTag,
  description,
  onClick,
  children,
  sqaure = false,
  cssClass = '',
  height = 250,
  truncate = true,
}: any) => {
  return (
    <>
      <div
        className={`card shadow-none ${cssClass}`}
        style={{ cursor: 'pointer', minWidth: `calc(${height}px + 1rem)` }}
        onClick={onClick}
      >
        <Card
          className={`relative rounded-3xl !m-2 ${
            sqaure ? 'aspect-square' : ''
          }`}
          style={{ height, width: sqaure ? height : 'auto' }}
          title={name}
        >
          <Image src={image} fill objectFit='cover' alt='name' />
        </Card>
        <div className={!truncate ? 'px-2 pb-2' : '!pb-[4px] pt-0 px-0'}>
          <div className='flex flex-col items-center pt-2 px-2 overflow-hidden'>
            <h4
              className={`text-primary text-base ${truncate ? 'truncate' : ''}`}
            >
              {name}
            </h4>
            {nameTag && <Chip className='m-0.5'>{nameTag}</Chip>}
            <h6
              className={`text-terciary text-center w-[90%] overflow-hidden text-xs ${
                truncate ? 'truncate' : ''
              }`}
              style={{ minHeight: 19 }}
            >
              {description}
            </h6>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
