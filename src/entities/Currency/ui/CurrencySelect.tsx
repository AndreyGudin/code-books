import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Currency } from '../model/types/currency';
import { ListBox } from '@/shared/ui/deprecated/Popups';

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
      <ListBox
        className={classNames('', {}, [className])}
        value={value}
        defaultValue={t('Укажите валюту') ?? ''}
        items={options}
        label={t('Укажите валюту') ?? ''}
        onChange={onChangeHandler}
        disabled={readonly}
        direction="top right"
      />
    );
  }
);
