import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getAuthUserData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader: FC<EditableProfileCardHeaderProps> =
  memo(({ className = '' }: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation('profile');
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    const authData = useSelector(getAuthUserData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData()).catch((e) => {
        console.log(e);
      });
    }, [dispatch]);

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card border="partial" padding="24" fullWidth>
            <HStack
              max
              justify="between"
              className={classNames('', {}, [className])}
            >
              <Text title={t('Профиль')} />
              {canEdit ? (
                <>
                  {readonly !== undefined && readonly ? (
                    <Button
                      data-testid={'EditableProfileCardHeader.EditButton'}
                      variant={'outline'}
                      onClick={onEdit}
                    >
                      {t('Редактировать')}
                    </Button>
                  ) : (
                    <HStack gap="8">
                      <Button
                        data-testid={'EditableProfileCardHeader.CancelButton'}
                        variant={'outline'}
                        onClick={onCancelEdit}
                        color="error"
                      >
                        {t('Отменить')}
                      </Button>
                      <Button
                        data-testid={'EditableProfileCardHeader.SaveButton'}
                        variant={'outline'}
                        onClick={onSave}
                        color="success"
                      >
                        {t('Сохранить')}
                      </Button>
                    </HStack>
                  )}
                </>
              ) : null}
            </HStack>
          </Card>
        }
        off={
          <HStack
            max
            justify="between"
            className={classNames('', {}, [className])}
          >
            <DeprecatedText title={t('Профиль')} />
            {canEdit ? (
              <>
                {readonly !== undefined && readonly ? (
                  <DeprecatedButton
                    data-testid={'EditableProfileCardHeader.EditButton'}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEdit}
                  >
                    {t('Редактировать')}
                  </DeprecatedButton>
                ) : (
                  <HStack gap="8">
                    <DeprecatedButton
                      data-testid={'EditableProfileCardHeader.CancelButton'}
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={onCancelEdit}
                    >
                      {t('Отменить')}
                    </DeprecatedButton>
                    <DeprecatedButton
                      data-testid={'EditableProfileCardHeader.SaveButton'}
                      theme={ButtonTheme.OUTLINE}
                      onClick={onSave}
                    >
                      {t('Сохранить')}
                    </DeprecatedButton>
                  </HStack>
                )}
              </>
            ) : null}
          </HStack>
        }
      />
    );
  });
