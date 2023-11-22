import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, FC, ForwardedRef } from 'react';

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
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Button: FC<ButtonProps> = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
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
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
