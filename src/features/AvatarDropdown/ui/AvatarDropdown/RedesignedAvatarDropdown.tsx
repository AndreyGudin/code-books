import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AvatarDropdown.module.scss';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import {
  getAuthUserData,
  isUserAdmin,
  isUserManager,
  userActions
} from '@/entities/User';
import {
  getRouteAdmin,
  getRouteProfile,
  getRouteSettings
} from '@/shared/const/router';

interface RedesignedAvatarDropdownProps {
  className?: string;
}

export const RedesignedAvatarDropdown: FC<RedesignedAvatarDropdownProps> = memo(
  ({ className = '' }: RedesignedAvatarDropdownProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authData = useSelector(getAuthUserData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onLogout = useCallback(() => {
      dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (authData === undefined) return null;

    return (
      <>
        <Dropdown
          className={classNames(cls.AvatarDropdown, {}, [className])}
          items={[
            ...(isAdminPanelAvailable
              ? [
                  {
                    content: t('Админка'),
                    href: getRouteAdmin()
                  }
                ]
              : []),
            {
              content: t('Настройки'),
              href: getRouteSettings()
            },
            {
              content: t('Профиль'),
              href: getRouteProfile(authData.id)
            },
            { content: t('Выйти'), onClick: onLogout }
          ]}
          trigger={<Avatar size={40} src={authData.avatar} />}
          direction="bottom left"
        />
      </>
    );
  }
);
