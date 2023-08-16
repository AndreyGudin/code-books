import { useMemo } from 'react';
import type { ChangeEvent } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Select = <T extends string>({
  className = '',
  label = '',
  options = [],
  value,
  readonly = false,
  onChange = () => {}
}: SelectProps<T>) => {
  const optionsList = useMemo(() => {
    return options.map((opt) => (
      <option className={cls.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ));
  }, [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    console.log('e.target.value', e.target.value);
    onChange(e.target.value as T);
  };

  return (
    <div className={classNames(cls.Wrapper, {}, [className])}>
      {label.length > 0 ? <span className={cls.label}>{label}</span> : null}
      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  );
};
