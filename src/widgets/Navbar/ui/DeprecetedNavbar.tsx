/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { LoginModal } from '@/features/AuthByUsername';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getAuthUserData } from '@/entities/User';
import cls from './Navbar.module.scss';
import { Text } from '@/shared/ui/deprecated/Text';
import { TextTheme } from '@/shared/ui/deprecated/Text/const';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { AppLinkTheme } from '@/shared/ui/deprecated/AppLink/const';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { getRouteArticleCreate } from '@/shared/const/router';
import { useDevice } from '@/shared/hooks/useDevice';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';
import AddArtileIcon from '@/shared/assets/icons/plus.svg';

interface DeprecatedNavbarProps {
  className?: string;
}

export const DeprecatedNavbar: FC = memo(
  ({ className = '' }: DeprecatedNavbarProps) => {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const authData = useSelector(getAuthUserData);
    const isMobile = useDevice();

    const openModalHandler = useCallback(() => {
      setOpenModal(true);
    }, []);

    const closeHandler = useCallback(() => {
      setOpenModal(false);
    }, []);

    if (authData !== undefined) {
      return (
        <header className={classNames(cls.Navbar, {}, [className])}>
          <Text
            theme={TextTheme.INVERTED}
            className={cls.appName}
            title={t('Название')}
          />
          {isMobile ? (
            <AppLink
              theme={AppLinkTheme.SECONDARY}
              to={getRouteArticleCreate()}
              className={cls.createLink}
            >
              <DeprecatedIcon inverted Svg={AddArtileIcon} />
            </AppLink>
          ) : (
            <AppLink
              theme={AppLinkTheme.SECONDARY}
              to={getRouteArticleCreate()}
              className={cls.createLink}
            >
              {t('Создать статью')}
            </AppLink>
          )}

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
          <DeprecatedButton
            theme={ButtonTheme.CLEAR_INVERTED}
            className={cls.links}
            onClick={openModalHandler}
          >
            {t('Войти')}
          </DeprecatedButton>
        </div>

        <LoginModal isOpen={openModal} onClose={closeHandler} />
      </header>
    );
  }
);
