/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { LoginModal } from '@/features/AuthByUsername';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getAuthUserData } from '@/entities/User';
import cls from './Navbar.module.scss';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';

interface RedesignedNavbarProps {
  className?: string;
}

export const RedesignedNavbar: FC = memo(
  ({ className = '' }: RedesignedNavbarProps) => {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const authData = useSelector(getAuthUserData);

    const openModalHandler = useCallback(() => {
      setOpenModal(true);
    }, []);

    const closeHandler = useCallback(() => {
      setOpenModal(false);
    }, []);

    if (authData !== undefined) {
      return (
        <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
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
            onClick={openModalHandler}
          >
            {t('Войти')}
          </Button>
        </div>

        <LoginModal isOpen={openModal} onClose={closeHandler} />
      </header>
    );
  }
);
