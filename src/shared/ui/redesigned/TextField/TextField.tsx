import { memo } from 'react';
import type { FC, InputHTMLAttributes } from 'react';
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

export const TextField: FC<TextFieldProps> = memo(
  ({
    className = '',
    text = '',
    cols,
    name = 'textarea',
    border = 'normal',
    rows,
    ...otherProps
  }: TextFieldProps) => {
    return (
      <textarea
        name={name}
        cols={cols}
        rows={rows}
        className={classNames(cls.TextField, {}, [className, cls[border]])}
        {...otherProps}
        defaultValue={text}
      />
    );
  }
);
