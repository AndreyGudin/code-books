import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { Input as DeprecatedInput } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { classNames } from '@/shared/lib/classNames/classNames';

import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { TextTheme } from '@/shared/ui/deprecated/Text/const';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import cls from './LoginForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
};

const LoginForm: FC<LoginFormProps> = memo(
  ({ className = '', onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loginForm = useSelector(getLoginState);

    const onChangeUsername = useCallback(
      (value: string) => {
        dispatch(loginActions.setUsername(value));
      },
      [dispatch]
    );

    const onChangePassword = useCallback(
      (value: string) => {
        dispatch(loginActions.setPassword(value));
      },
      [dispatch]
    );

    const onLoginClick = useCallback(async () => {
      const result = await dispatch(
        loginByUserName({
          username: loginForm?.username ?? '',
          password: loginForm?.password ?? ''
        })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
      }
    }, [dispatch, loginForm?.password, loginForm?.username, onSuccess]);

    return (
      <DynamicModuleLoader reducers={initialReducers}>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <VStack
              className={classNames(cls.LoginForm, {}, [className])}
              gap="16"
              max
            >
              <Text title={t('Форма авторизации')} />
              {loginForm?.error !== undefined ? (
                <Text
                  variant={'error'}
                  text={t('Вы ввели неверный логин или пароль')}
                />
              ) : null}
              <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={t('Пользователь') ?? ''}
                onChange={onChangeUsername}
                value={loginForm?.username ?? ''}
              />
              <Input
                type="text"
                className={cls.input}
                placeholder={t('Пароль') ?? ''}
                onChange={onChangePassword}
                value={loginForm?.password ?? ''}
              />
              <Button
                variant={'outline'}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={loginForm?.isLoading}
              >
                {t('Войти')}
              </Button>
            </VStack>
          }
          off={
            <div className={classNames(cls.LoginForm, {}, [className])}>
              <Text title={t('Форма авторизации')} />
              {loginForm?.error !== undefined ? (
                <DeprecatedText
                  theme={TextTheme.ERROR}
                  text={t('Вы ввели неверный логин или пароль')}
                />
              ) : null}
              <DeprecatedInput
                autofocus
                type="text"
                className={cls.input}
                placeholder={t('Пользователь') ?? ''}
                onChange={onChangeUsername}
                value={loginForm?.username ?? ''}
              />
              <DeprecatedInput
                type="text"
                className={cls.input}
                placeholder={t('Пароль') ?? ''}
                onChange={onChangePassword}
                value={loginForm?.password ?? ''}
              />
              <DeprecatedButton
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={loginForm?.isLoading}
              >
                {t('Войти')}
              </DeprecatedButton>
            </div>
          }
        />
      </DynamicModuleLoader>
    );
  }
);

export default LoginForm;
