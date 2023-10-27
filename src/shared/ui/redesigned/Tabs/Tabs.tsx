import { memo, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs: FC<TabsProps> = memo(
  ({
    className = '',
    onTabClick,
    tabs,
    value,
    direction = 'row'
  }: TabsProps) => {
    const clickHandle = useCallback(
      (tab: TabItem) => {
        return () => {
          onTabClick(tab);
        };
      },
      [onTabClick]
    );

    return (
      <Flex
        direction={direction}
        gap="8"
        className={classNames(cls.Tabs, {}, [className])}
      >
        {tabs.map((tab, i) => {
          return (
            <Card
              onClick={clickHandle(tab)}
              variant={tab.value === value ? 'normal' : 'outlined'}
              className={cls.tab}
              key={tab.value}
              border="round"
            >
              {tab.content}
            </Card>
          );
        })}
      </Flex>
    );
  }
);
