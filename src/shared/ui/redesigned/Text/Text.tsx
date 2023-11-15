import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'left' | 'right' | 'center';

export type TextSize = 's' | 'm' | 'l';
interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;

  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
  s: cls.size_s,
  m: cls.size_m,
  l: cls.size_l
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1'
};

export const Text: FC<TextProps> = memo(
  ({
    className = '',
    title = '',
    text = '',
    variant = 'primary',
    align = 'left',
    size = 'm',
    bold = false,
    'data-testid': dataTestId = 'Text'
  }: TextProps) => {
    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];
    return (
      <div
        className={classNames('', { [cls.bold]: bold }, [
          cls[variant],
          cls[align],
          sizeClass,
          className
        ])}
      >
        {title !== '' ? (
          <HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>
            {title}
          </HeaderTag>
        ) : null}
        {text !== '' ? (
          <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
            {text}
          </p>
        ) : null}
      </div>
    );
  }
);
