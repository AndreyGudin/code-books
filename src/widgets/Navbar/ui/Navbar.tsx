/* eslint-disable i18next/no-literal-string */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Navbar.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

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

      <Modal isOpen={isAuthModal} onClose={onCloseModal} animate={animate}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam magnam
        quibusdam dolorem quae? Aliquid ex nisi fugiat deserunt autem recusandae
        quaerat obcaecati, odit enim omnis dignissimos numquam, velit, ullam
        dolorem.
      </Modal>
    </div>
  );
};
