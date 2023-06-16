import { memo } from 'react';
import type { HTMLAttributes, FC, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card: FC<CardProps> = memo(
  ({ children, className = '', ...otherProps }: CardProps) => {
    return (
      <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
        {children}
      </div>
    );
  }
);
