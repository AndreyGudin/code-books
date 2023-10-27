import { memo } from 'react';
import type { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const {
    className = '',
    children,
    variant = 'outline',
    square = false,
    size = 'm',
    disabled = false,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cls.square]: square,
    [cls.disabled]: disabled
  };

  return (
    <button
      className={classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size]
      ])}
      {...otherProps}
      disabled={disabled}
    >
      {children}
    </button>
  );
});
