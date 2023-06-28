import { memo } from 'react';
import type { HTMLAttributes, FC, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

export const Card: FC<CardProps> = memo(
  ({
    children,
    className = '',
    theme = CardTheme.NORMAL,
    ...otherProps
  }: CardProps) => {
    return (
      <div
        className={classNames(cls.Card, {}, [className, cls[theme]])}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);
