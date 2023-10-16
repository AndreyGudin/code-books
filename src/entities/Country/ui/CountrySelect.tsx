import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { Country } from '../model/types/country';
import { ListBox } from '@/shared/ui/deprecated/Popups';

interface CountrySelectProps {
  className?: string;
  value?: string;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine }
];

export const CountrySelect: FC<CountrySelectProps> = memo(
  ({
    className = '',
    value,
    onChange,
    readonly = true
  }: CountrySelectProps) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange]
    );

    return (
      <ListBox
        items={options}
        disabled={readonly}
        onChange={onChangeHandler}
        value={value}
        defaultValue={t('Укажите страну') ?? ''}
        label={t('Укажите страну') ?? ''}
        direction="top right"
      />
    );
  }
);
