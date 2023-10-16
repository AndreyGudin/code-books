import { useState, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.new.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';

interface RedesignedSidebarProps {
  className?: string;
}

export const RedesignedSidebar: FC = memo(
  ({ className = '' }: RedesignedSidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemList = useSelector(getSidebarItems);

    const onToggle = (): void => {
      setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
      () =>
        sidebarItemList.map((item, i) => {
          return (
            <SidebarItem key={item.path} item={item} collapsed={collapsed} />
          );
        }),
      [collapsed, sidebarItemList]
    );

    return (
      <aside
        data-testid="sidebar"
        className={classNames(
          cls.SidebarRedesigned,
          { [cls.collapsed]: collapsed },
          [className]
        )}
      >
        <AppLogo className={cls.appLogo} />
      </aside>
    );
  }
);
