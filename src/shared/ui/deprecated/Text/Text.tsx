import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { TextTheme, TextAlign, TextSize } from './const';

interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;

  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1'
};
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Text: FC<TextProps> = memo(
  ({
    className = '',
    title = '',
    text = '',
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    'data-testid': dataTestId = 'Text'
  }: TextProps) => {
    const HeaderTag = mapSizeToHeaderTag[size];

    const mods: Mods = {
      [cls[theme]]: true,
      [cls[align]]: true,
      [cls[size]]: true
    };

    return (
      <div className={classNames('', mods, [className])}>
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