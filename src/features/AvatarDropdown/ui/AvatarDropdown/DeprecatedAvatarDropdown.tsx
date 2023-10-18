import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AvatarDropdown.module.scss';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import {
  getAuthUserData,
  isUserAdmin,
  isUserManager,
  userActions
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';

interface DeprecatedAvatarDropdownProps {
  className?: string;
}

export const DeprecatedAvatarDropdown: FC<DeprecatedAvatarDropdownProps> = memo(
  ({ className = '' }: DeprecatedAvatarDropdownProps) => {
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
        <DropdownDeprecated
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
              content: t('Профиль'),
              href: getRouteProfile(authData.id)
            },
            { content: t('Выйти'), onClick: onLogout }
          ]}
          trigger={
            <AvatarDeprecated
              fallbackInverted
              size={30}
              src={authData.avatar}
            />
          }
          direction="bottom left"
        />
      </>
    );
  }
);
