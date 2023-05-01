/* eslint-disable i18next/no-literal-string */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC = ({ className = '' }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setAuthModal] = useState(false);
  const [animate, setAnimate] = useState(false);
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

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

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
