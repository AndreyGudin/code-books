import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import type { Mods } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l'
}

interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

export const Text: FC<TextProps> = memo(
  ({
    className = '',
    title = '',
    text = '',
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M
  }: TextProps) => {
    const mods: Mods = {
      [cls[theme]]: true,
      [cls[align]]: true,
      [cls[size]]: true
    };

    return (
      <div className={classNames(cls.Text, mods, [className])}>
        {title !== '' ? <p className={cls.title}>{title}</p> : null}
        {text !== '' ? <p className={cls.text}>{text}</p> : null}
      </div>
    );
  }
);
