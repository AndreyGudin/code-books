import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import type { Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import type { Profile } from '../../model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';

import cls from './ProfileCard.module.scss';
import { CurrencySelect } from 'entities/Currency';
import type { Currency } from 'entities/Currency';
import { CountrySelect } from 'entities/Country';
import type { Country } from 'entities/Country';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstName?: (value?: string) => void;
  onChangeLastName?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeCurrency?: (value?: Currency) => void;
  onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard: FC<ProfileCardProps> = ({
  className = '',
  readonly = true,
  data,
  error,
  isLoading,
  onChangeFirstName,
  onChangeLastName,
  onChangeCity,
  onChangeAge,
  onChangeAvatar,
  onChangeUsername,
  onChangeCurrency,
  onChangeCountry
}: ProfileCardProps) => {
  const { t } = useTranslation('profile');

  const mods: Mods = {
    [cls.editing]: !readonly
  };

  if (isLoading !== undefined && isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, mods, [className, cls.loading])}
      >
        <Loader />
      </div>
    );
  }

  if (error !== undefined && error.length > 0) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте перезагрузить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.data}>
        <div>
          {data?.avatar?.length !== undefined && data?.avatar?.length > 0 ? (
            <div className={cls.avatarWrapper}>
              <Avatar src={data?.avatar} alt="" />
            </div>
          ) : null}
        </div>

        <Input
          value={data?.first ?? ''}
          placeholder={t('Ваше имя') ?? ''}
          className={cls.input}
          onChange={onChangeFirstName}
          readonly={readonly}
        />
        <Input
          value={data?.lastname ?? ''}
          placeholder={t('Ваше фамилия') ?? ''}
          className={cls.input}
          onChange={onChangeLastName}
          readonly={readonly}
        />

        <Input
          value={data?.age?.toString() ?? ''}
          placeholder={t('Ваш возраст') ?? ''}
          type="number"
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />

        <Input
          value={data?.city ?? ''}
          placeholder={t('Ваш город') ?? ''}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username ?? ''}
          placeholder={t('Введите имя пользователя') ?? ''}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.avatar ?? ''}
          placeholder={t('Введите ссылку на аватар') ?? ''}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          className={cls.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          className={cls.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
