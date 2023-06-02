import type { CSSProperties, FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border: string | number;
}

export const Skeleton: FC<SkeletonProps> = ({
  className = '',
  height,
  width,
  border
}: SkeletonProps) => {

  const style:CSSProperties = {
   width, height,borderRadius: boder
  }= 

  return <div className={classNames(cls.Skeleton, {}, [className])}></div>;
};
