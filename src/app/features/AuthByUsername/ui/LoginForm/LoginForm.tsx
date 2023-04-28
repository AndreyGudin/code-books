import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({
  className = ''
}: LoginFormProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={t('Пользователь') ?? ''}
      />
      <Input
        type="text"
        className={cls.input}
        placeholder={t('Пароль') ?? ''}
      />
      <Button className={cls.loginBtn}>{t('Войти')}</Button>
    </div>
  );
};
