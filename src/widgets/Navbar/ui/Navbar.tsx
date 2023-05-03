/* eslint-disable i18next/no-literal-string */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { classNames } from 'shared/lib/classNames/classNames';
import { getAuthUserData, userActions } from 'entities/User';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC = ({ className = '' }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setAuthModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();
  const authData = useSelector(getAuthUserData);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const onToggleModal = useCallback(() => {
    setAuthModal((prev) => !prev);
    timeRef.current = setTimeout(() => {
      setAnimate((prev) => !prev);
    }, 0);
  }, []);

  const onCloseModal = useCallback(() => {
    setAnimate((prev) => !prev);
    timeRef.current = setTimeout(() => {
      setAuthModal((prev) => !prev);
    }, 300);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

  if (authData !== undefined) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t('Выйти')}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={onToggleModal}
        >
          {t('Войти')}
        </Button>
      </div>

      <LoginModal
        animate={animate}
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </div>
  );
};
