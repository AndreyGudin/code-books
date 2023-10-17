import { memo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { getAuthUserData } from '@/entities/User';
import type { SidebarItemType } from '../../../model/types/sidebar';
import { ToggleFeatures } from '@/shared/lib/features';
import { RedesignedSidebarItem } from './RedesignedSidebarItem';
import { DeprecatedSidebarItem } from './DeprecatedSidebarItem';

interface RedesignedSidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem: FC<RedesignedSidebarItemProps> = memo(
  ({ item, collapsed }: RedesignedSidebarItemProps) => {
    const isAuth = useSelector(getAuthUserData);

    if ((item.authOnly ?? false) && isAuth === undefined) {
      return null;
    }

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<RedesignedSidebarItem item={item} collapsed={collapsed} />}
        off={<DeprecatedSidebarItem item={item} collapsed={collapsed} />}
      />
    );
  }
);
