import { memo, useEffect, useRef } from 'react';
import type { FC, InputHTMLAttributes } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
  const {
    className = '',
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus = false,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder ?? <div className={cls.placeholder}>{placeholder}</div>}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        className={cls.input}
        {...otherProps}
      />
    </div>
  );
});
