import { memo } from 'react';
import type { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { type ButtonTheme, ButtonSize } from './const';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const {
    className = '',
    children,
    theme = '',
    square = false,
    size = ButtonSize.M,
    disabled = false,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled
  };

  return (
    <button
      className={classNames(cls.Button, mods, [className])}
      {...otherProps}
      disabled={disabled}
    >
      {children}
    </button>
  );
});
