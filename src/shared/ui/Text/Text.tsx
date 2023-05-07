import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null;
  theme?: TextTheme;
}

export const Text: FC<TextProps> = memo(
  ({
    className = '',
    title = '',
    text = '',
    theme = TextTheme.PRIMARY
  }: TextProps) => {
    return (
      <div
        className={classNames(cls.Text, { [cls[theme]]: true }, [className])}
      >
        {title !== '' ? <p className={cls.title}>{title}</p> : null}
        {text !== '' ? <p className={cls.text}>{text}</p> : null}
      </div>
    );
  }
);
