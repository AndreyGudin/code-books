import type { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly';

export type FlexAlign = 'start' | 'end' | 'center';

export type FlexDirection = 'row' | 'column';

export type FlexGap = '4' | '8' | '16' | '32';

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  around: cls.justifyAround,
  between: cls.justifyBetween,
  evenly: cls.justifyEvenly
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  32: cls.gap32
};

export const getFlexClasses = ({
  align = 'center',
  direction = 'row',
  gap,
  justify = 'start',
  max = false
}: Pick<
  FlexProps,
  'justify' | 'align' | 'direction' | 'gap' | 'max'
>): string => {
  const classes = [
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap !== undefined ? gapClasses[gap] : ''
  ];

  const mods: Mods = {
    [cls.maxWidth]: max
  };

  return classNames(cls.Flex, mods, classes);
};

export const Flex: FC<FlexProps> = ({
  children,
  className = '',
  justify = 'start',
  align = 'center',
  direction = 'row',
  gap,
  max = false,
  ...otherProps
}: FlexProps) => {
  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap !== undefined ? gapClasses[gap] : ''
  ];

  const mods: Mods = {
    [cls.maxWidth]: max
  };

  return (
    <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
