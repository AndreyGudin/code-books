import { forwardRef } from 'react';
import type { FC, InputHTMLAttributes, RefAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TextField.module.scss';

interface TextFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name?: string;
  rows?: number;
  cols?: number;
  text?: string;
  border?: TextFieldBorder;
}

export type TextFieldBorder = 'round' | 'normal' | 'partial';

export const TextField: FC<
  RefAttributes<HTMLTextAreaElement> & TextFieldProps
> = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  (
    {
      className = '',
      text = '',
      cols,
      name = 'textarea',
      border = 'normal',
      rows,
      ...otherProps
    }: TextFieldProps,
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        name={name}
        cols={cols}
        rows={rows}
        className={classNames(cls.TextField, {}, [className, cls[border]])}
        {...otherProps}
        value={text}
      />
    );
  }
);
