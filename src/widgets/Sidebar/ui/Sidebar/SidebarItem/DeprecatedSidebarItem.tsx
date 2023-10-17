import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLinkTheme } from '@/shared/ui/deprecated/AppLink/const';

import cls from './SidebarItem.module.scss';
import { getAuthUserData } from '@/entities/User';
import type { SidebarItemType } from '../../../model/types/sidebar';

interface DeprecatedSidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const DeprecatedSidebarItem: FC<DeprecatedSidebarItemProps> = memo(
  ({ item, collapsed }: DeprecatedSidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getAuthUserData);

    if ((item.authOnly ?? false) && isAuth === undefined) {
      return null;
    }

    return (
      <div className={classNames(cls.SidebarItem, {}, [])}>
        <AppLinkDeprecated
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}> {t(item.text)}</span>
        </AppLinkDeprecated>
      </div>
    );
  }
);
