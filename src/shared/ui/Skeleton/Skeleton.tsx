import type { FC } from 'react';

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
  return <div className={classNames(cls.Skeleton, {}, [className])}></div>;
};
