import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: string;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD }
];

export const CurrencySelect: FC<CurrencySelectProps> = memo(
  ({
    className = '',
    value,
    onChange,
    readonly = true
  }: CurrencySelectProps) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange]
    );

    return (
      <Select
        className={classNames('', {}, [className])}
        label={t('Укажите валюту') ?? ''}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  }
);
