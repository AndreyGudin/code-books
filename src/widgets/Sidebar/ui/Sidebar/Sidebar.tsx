import { useState, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { LangSwitcher } from 'widgets/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

import cls from './Sidebar.module.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC = memo(({ className = '' }: SidebarProps) => {
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
    <div
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
      <div className={cls.items}>{itemsList}</div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  );
});
