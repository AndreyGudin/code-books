import { useState, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import cls from './Sidebar.module.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';

interface DeprecatedSidebarProps {
  className?: string;
}

export const DeprecatedSidebar: FC = memo(
  ({ className = '' }: DeprecatedSidebarProps) => {
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
        className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
          className
        ])}
      >
        <Button
          className={cls.collapsedBtn}
          data-testid="sidebar-toggle"
          onClick={onToggle}
          theme={ButtonTheme.BACKGROUND_INVERTED}
          square={true}
          size={ButtonSize.L}
        >
          {collapsed ? '>' : '<'}
        </Button>
        <VStack role="navigation" className={cls.items}>
          {itemsList}
        </VStack>
        <div className={cls.switchers}>
          <ThemeSwitcher />
          <LangSwitcher short={collapsed} className={cls.lang} />
        </div>
      </aside>
    );
  }
);
