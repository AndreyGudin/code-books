import type { FC } from 'react';

import type { Profile } from '../../model/types/profile';

import type { Currency } from '@/entities/Currency';
import type { Country } from '@/entities/Country';
import { ToggleFeatures } from '@/shared/lib/features';
import { RedesignedProfileCard } from '../RedesignedProfileCard/RedesignedProfileCard';
import { DeprecatedProfileCard } from '../DeprecatedProfileCard/DeprecatedProfileCard';

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
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <RedesignedProfileCard
          className={className}
          readonly={readonly}
          data={data}
          error={error}
          isLoading={isLoading}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeCity={onChangeCity}
          onChangeAge={onChangeAge}
          onChangeAvatar={onChangeAvatar}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      }
      off={
        <DeprecatedProfileCard
          className={className}
          readonly={readonly}
          data={data}
          error={error}
          isLoading={isLoading}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeCity={onChangeCity}
          onChangeAge={onChangeAge}
          onChangeAvatar={onChangeAvatar}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      }
    />
  );
};
