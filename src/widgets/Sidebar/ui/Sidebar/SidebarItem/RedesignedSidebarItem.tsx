import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

import cls from './SidebarItem.module.new.scss';
import { getAuthUserData } from '@/entities/User';
import type { SidebarItemType } from '../../../model/types/sidebar';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface RedesignedSidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const RedesignedSidebarItem: FC<RedesignedSidebarItemProps> = memo(
  ({ item, collapsed }: RedesignedSidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getAuthUserData);

    if ((item.authOnly ?? false) && isAuth === undefined) {
      return null;
    }

    return (
      <div className={classNames(cls.SidebarItem, {}, [])}>
        <AppLink
          className={classNames(cls.itemRedesigned, {
            [cls.collapsedRedesigned]: collapsed
          })}
          activeClassName={cls.active}
          to={item.path}
          variant="primary"
        >
          <Icon Svg={item.Icon} />
          <span className={cls.link}> {t(item.text)}</span>
        </AppLink>
      </div>
    );
  }
);
