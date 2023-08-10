/* eslint-disable i18next/no-literal-string */
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'shared/ui/Button/Button';
import { ButtonTheme } from 'shared/ui/Button/const';
import { LoginModal } from 'features/AuthByUsername';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  getAuthUserData,
  isUserAdmin,
  isUserManager,
  userActions
} from 'entities/User';
import cls from './Navbar.module.scss';
import { Text } from 'shared/ui/Text/Text';
import { TextTheme } from 'shared/ui/Text/const';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { AppLinkTheme } from 'shared/ui/AppLink/const';
import { RoutePath } from 'shared/config/routerConfig/routerConfig';
import { Dropdown } from 'shared/ui/Popups/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { HStack } from 'shared/ui/Stack';
import { NotificationButton } from 'features/NotificationButton';
import { AvatarDropdown } from 'features/AvatarDropdown';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC = memo(({ className = '' }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setAuthModal] = useState(false);
  const [animate, setAnimate] = useState(false);
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

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

  if (authData !== undefined) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          className={cls.appName}
          title={t('Название')}
        />
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.article_create}
          className={cls.createLink}
        >
          {t('Создать статью')}
        </AppLink>
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
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
    </header>
  );
});
