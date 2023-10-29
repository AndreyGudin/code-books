import { memo } from 'react';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

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
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const {
    className = '',
    children,
    variant = 'outline',
    square = false,
    size = 'm',
    disabled = false,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight)
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
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      {children}
      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </button>
  );
});
