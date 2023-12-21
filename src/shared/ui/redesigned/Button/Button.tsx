import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, FC, ForwardedRef, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  color?: ButtonColor;
}

export const Button: FC<ButtonProps> = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      className = '',
      children,
      variant = 'outline',
      square = false,
      size = 'm',
      disabled = false,
      color = 'normal',
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
          cls[size],
          cls[color]
        ])}
        {...otherProps}
        disabled={disabled}
        ref={ref}
      >
        {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
        {children}
        {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
      </button>
    );
  }
);
