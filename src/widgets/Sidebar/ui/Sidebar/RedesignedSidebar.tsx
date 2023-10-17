import { useState, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.new.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';

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
          { [cls.collapsedRedesigned]: collapsed },
          [className]
        )}
      >
        <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
        <VStack role="navigation" className={cls.items} gap="8">
          {itemsList}
        </VStack>
        <Icon
          className={cls.collapsedBtn}
          data-testid="sidebar-toggle"
          onClick={onToggle}
          Svg={ArrowIcon}
          clickable
        />
        <div className={cls.switchers}>
          <ThemeSwitcher />
          <LangSwitcher short={collapsed} className={cls.lang} />
        </div>
      </aside>
    );
  }
);
