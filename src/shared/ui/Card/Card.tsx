import { memo } from 'react';
import type { HTMLAttributes, FC, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';
import { CardTheme } from './const';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  fullWidth?: boolean;
}

export const Card: FC<CardProps> = memo(
  ({
    children,
    className = '',
    theme = CardTheme.NORMAL,
    fullWidth = false,
    ...otherProps
  }: CardProps) => {
    return (
      <div
        className={classNames(cls.Card, { [cls.fullWidth]: fullWidth }, [
          className,
          cls[theme]
        ])}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);
