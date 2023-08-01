/* eslint-disable i18next/no-literal-string */
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  getAuthUserData,
  isUserAdmin,
  isUserManager,
  userActions
} from 'entities/User';

import cls from './Navbar.module.scss';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routerConfig/routerConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC = memo(({ className = '' }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setAuthModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();
  const authData = useSelector(getAuthUserData);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

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

  const isAdminPanelAvailable = isAdmin || isManager;

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
        <Dropdown
          className={cls.dropdown}
          items={[
            ...(isAdminPanelAvailable
              ? [
                  {
                    content: t('Админка'),
                    href: RoutePath.admin_panel
                  }
                ]
              : []),
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id
            },
            { content: t('Выйти'), onClick: onLogout }
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
          direction="bottom left"
        />
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
