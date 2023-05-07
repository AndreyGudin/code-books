import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import type { SidebarItemType } from 'widgets/Sidebar/model/items';

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = memo(
  ({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    return (
      <div className={classNames(cls.SidebarItem, {}, [])}>
        <AppLink
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}> {t(item.text)}</span>
        </AppLink>
      </div>
    );
  }
);
