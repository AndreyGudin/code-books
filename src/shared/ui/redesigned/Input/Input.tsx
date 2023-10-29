import { memo, useEffect, useRef, useState } from 'react';
import type { FC, InputHTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  readonly?: boolean;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
  const {
    className = '',
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus = false,
    readonly = false,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight)
  };

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const onBlur = (): void => {
    setIsFocused(false);
  };

  const onFocus = (): void => {
    setIsFocused(true);
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlur}
        onFocus={onFocus}
        className={cls.input}
        readOnly={readonly}
        placeholder={placeholder}
        {...otherProps}
      />
      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </div>
  );
});
