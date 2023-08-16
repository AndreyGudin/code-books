import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';
import { Input } from '@/shared/ui/Input/Input';
import { classNames } from '@/shared/lib/classNames/classNames';

import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Text } from '@/shared/ui/Text/Text';
import { TextTheme } from '@/shared/ui/Text/const';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import cls from './LoginForm.module.scss';

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
        <div className={classNames(cls.LoginForm, {}, [className])}>
          <Text title={t('Форма авторизации')} />
          {loginForm?.error !== undefined ? (
            <Text
              theme={TextTheme.ERROR}
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
            theme={ButtonTheme.OUTLINE}
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={loginForm?.isLoading}
          >
            {t('Войти')}
          </Button>
        </div>
      </DynamicModuleLoader>
    );
  }
);

export default LoginForm;
