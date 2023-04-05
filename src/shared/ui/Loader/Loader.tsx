import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import './Loader.scss';

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className = '' }: LoaderProps) => {
  return <div className={classNames('lds-hourglass', {}, [className])}></div>;
};
