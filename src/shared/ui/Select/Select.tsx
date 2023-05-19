import { memo, useMemo } from 'react';
import type { ChangeEvent, FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select: FC<SelectProps> = memo(
  ({
    className = '',
    label = '',
    options = [],
    value = '',
    readonly = true,
    onChange = () => {}
  }: SelectProps) => {
    const optionsList = useMemo(() => {
      return options.map((opt) => (
        <option className={cls.option} value={opt.value} key={opt.value}>
          {opt.content}
        </option>
      ));
    }, [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
      console.log('e.target.value', e.target.value);
      onChange(e.target.value);
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
  }
);
