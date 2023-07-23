import { memo, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs: FC<TabsProps> = memo(
  ({ className = '', onTabClick, tabs, value }: TabsProps) => {
    const clickHandle = useCallback(
      (tab: TabItem) => {
        return () => {
          onTabClick(tab);
        };
      },
      [onTabClick]
    );

    return (
      <div className={classNames(cls.Tabs, {}, [className])}>
        {tabs.map((tab, i) => {
          return (
            <Card
              onClick={clickHandle(tab)}
              theme={
                tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED
              }
              className={cls.tab}
              key={tab.value}
            >
              {tab.content}
            </Card>
          );
        })}
      </div>
    );
  }
);
