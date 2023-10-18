import { memo } from 'react';
import type { HTMLAttributes, FC, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  fullWidth?: boolean;
  padding?: CardPadding;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'padding_0',
  '8': 'padding_8',
  '16': 'padding_16',
  '24': 'padding_24'
};

export const Card: FC<CardProps> = memo(
  ({
    children,
    className = '',
    variant = 'normal',
    fullWidth = false,
    padding = '8',
    ...otherProps
  }: CardProps) => {
    const paddings = mapPaddingToClass[padding];

    return (
      <div
        className={classNames(
          cls.Card,
          {
            [cls.fullWidth]: fullWidth
          },
          [className, cls[variant], paddings]
        )}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);
