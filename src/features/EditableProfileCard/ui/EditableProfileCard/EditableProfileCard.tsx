import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditableProfileCard.module.scss';
import type { Country } from '@/entities/Country';
import type { Currency } from '@/entities/Currency';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { Text } from '@/shared/ui/deprecated/Text';
import { TextTheme } from '@/shared/ui/deprecated/Text/const';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { ValidateProfileError } from '../../model/consts/const';
import { ProfileCard } from '@/entities/Profile';
import {
  DynamicModuleLoader,
  type ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer
};
export const EditableProfileCard: FC<EditableProfileCardProps> = memo(
  ({ className = '', id }: EditableProfileCardProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('profile');

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates: Record<string, string> = {
      [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
      [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
      [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная страна'),
      [ValidateProfileError.INCORRECT_USER_DATA]: t(
        'Имя и фамилия обязательны'
      ),
      [ValidateProfileError.NO_DATA]: t('Данные не указаны')
    };

    useInitialEffect(() => {
      if (id !== undefined) {
        dispatch(fetchProfileData(id)).catch((e) => {
          console.log(e);
        });
      }
    });

    const onChangeFirstName = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ first: value ?? '' }));
      },
      [dispatch]
    );

    const onChangeLastName = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value ?? '' }));
      },
      [dispatch]
    );

    const onChangeCity = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ city: value ?? '' }));
      },
      [dispatch]
    );

    const onChangeAge = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value ?? 0) }));
      },
      [dispatch]
    );

    const onChangeAvatar = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value }));
      },
      [dispatch]
    );

    const onChangeUsername = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ username: value }));
      },
      [dispatch]
    );

    const onChangeCurrency = useCallback(
      (currency?: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
      },
      [dispatch]
    );

    const onChangeCountry = useCallback(
      (country?: Country) => {
        dispatch(profileActions.updateProfile({ country }));
      },
      [dispatch]
    );

    return (
      <DynamicModuleLoader reducers={reducers}>
        <VStack
          max
          gap={'8'}
          className={classNames(cls.EditableProfileCard, {}, [className])}
        >
          <EditableProfileCardHeader />
          {validateErrors !== undefined && validateErrors?.length > 0
            ? validateErrors?.map((err) => (
                <Text
                  key={err}
                  theme={TextTheme.ERROR}
                  text={validateErrorTranslates[err]}
                  data-testid="EditableProfileCard.Error"
                />
              ))
            : null}
          <ProfileCard
            data={formData}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeAvatar={onChangeAvatar}
            onChangeUsername={onChangeUsername}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
          />
        </VStack>
      </DynamicModuleLoader>
    );
  }
);
