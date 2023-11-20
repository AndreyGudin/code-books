import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Profile } from '../../model/types/profile';

import cls from './ProfileCard.new.module.scss';
import { CurrencySelect } from '@/entities/Currency';
import type { Currency } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import type { Country } from '@/entities/Country';
import { HStack, VStack, getFlexClasses } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { ProfileCardRedesignedSkeleton } from '../RedesignedProfileCard/RedesignedProfileCardSkeleton';
import { RedesignedProfileCardError } from '../RedesignedProfileCard/RedesignedProfileCardError';

interface RedesignedProfileCardProps {
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

export const RedesignedProfileCard: FC<RedesignedProfileCardProps> = ({
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
}: RedesignedProfileCardProps) => {
  const { t } = useTranslation('profile');

  if (isLoading !== undefined && isLoading) {
    return <ProfileCardRedesignedSkeleton />;
  }

  if (error !== undefined && error.length > 0) {
    return <RedesignedProfileCardError className={className} />;
  }

  return (
    <Card
      padding="16"
      fullWidth
      border="partial"
      className={classNames(cls.ProfileCard, {}, [
        className,
        getFlexClasses({ direction: 'column', gap: '32' })
      ])}
    >
      {data?.avatar?.length !== undefined && data?.avatar?.length > 0 ? (
        <HStack justify="center" className={cls.avatarWrapper}>
          <Avatar size={120} src={data?.avatar} alt="" />
        </HStack>
      ) : null}
      <HStack max gap="24">
        <VStack max gap="16">
          <Input
            value={data?.first ?? ''}
            label={t('Ваше имя') ?? ''}
            className={cls.input}
            onChange={onChangeFirstName}
            readonly={readonly}
            data-testid={'ProfileCard.firstName'}
          />
          <Input
            value={data?.lastname ?? ''}
            label={t('Ваше фамилия') ?? ''}
            className={cls.input}
            onChange={onChangeLastName}
            readonly={readonly}
            data-testid={'ProfileCard.lastName'}
          />

          <Input
            value={data?.age?.toString() ?? ''}
            label={t('Ваш возраст') ?? ''}
            type="number"
            className={cls.input}
            onChange={onChangeAge}
            readonly={readonly}
          />

          <Input
            value={data?.city ?? ''}
            label={t('Ваш город') ?? ''}
            className={cls.input}
            onChange={onChangeCity}
            readonly={readonly}
          />
        </VStack>
        <VStack max gap="16">
          <Input
            value={data?.username ?? ''}
            label={t('Имя пользователя') ?? ''}
            className={cls.input}
            onChange={onChangeUsername}
            readonly={readonly}
          />
          <Input
            value={data?.avatar ?? ''}
            label={t('Ссылка на аватар') ?? ''}
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
        </VStack>
      </HStack>
    </Card>
  );
};
