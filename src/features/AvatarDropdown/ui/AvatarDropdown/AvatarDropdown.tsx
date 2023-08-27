import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AvatarDropdown.module.scss';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import {
  getAuthUserData,
  isUserAdmin,
  isUserManager,
  userActions
} from '@/entities/User';
import { RoutePath } from '@/shared/const/router';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = memo(
  ({ className = '' }: AvatarDropdownProps) => {
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
      </>
    );
  }
);
