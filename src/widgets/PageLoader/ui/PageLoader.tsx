import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({
  className = ''
}: PageLoaderProps) => {
  return (
    <div
      data-testid={'PageLoader'}
      className={classNames(cls.PageLoader, {}, [className])}
    >
      <Loader />
    </div>
  );
};
