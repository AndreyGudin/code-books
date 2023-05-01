import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './LoginForm.module.scss';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import { loginByUserName } from 'features/AuthByUsername/model/services/loginByUserName/loginByUserName';
import { useAppDispatch } from 'shared/hooks/useAppDispathc';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = memo(
  ({ className = '' }: LoginFormProps) => {
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

    const onLoginClick = useCallback(() => {
      dispatch(
        loginByUserName({
          username: loginForm?.username ?? '',
          password: loginForm?.password ?? ''
        })
      ).catch((e) => {
        console.log(e);
      });
    }, [dispatch, loginForm?.password, loginForm?.username]);

    return (
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Input
          autofocus
          type="text"
          className={cls.input}
          placeholder={t('Пользователь') ?? ''}
          onChange={onChangeUsername}
          value={loginForm?.username}
        />
        <Input
          type="text"
          className={cls.input}
          placeholder={t('Пароль') ?? ''}
          onChange={onChangePassword}
          value={loginForm?.password}
        />
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.loginBtn}
          onClick={onLoginClick}
        >
          {t('Войти')}
        </Button>
      </div>
    );
  }
);
