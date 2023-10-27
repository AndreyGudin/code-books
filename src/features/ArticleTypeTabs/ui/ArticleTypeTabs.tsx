import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import type { TabItem } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = memo(
  ({ className = '', value, onChangeType }: ArticleTypeTabsProps) => {
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
      () => [
        { value: ArticleType.ALL, content: t('Все статьи') },
        { value: ArticleType.IT, content: t('Айти') },
        { value: ArticleType.ECONOMICS, content: t('Экономика') },
        { value: ArticleType.SCIENCE, content: t('Наука') }
      ],
      [t]
    );

    const OnTabClick = useCallback(
      (tab: TabItem) => {
        onChangeType(tab.value as ArticleType);
      },
      [onChangeType]
    );

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Tabs
            direction="column"
            tabs={typeTabs}
            value={value}
            onTabClick={OnTabClick}
            className={classNames('', {}, [className])}
          />
        }
        off={
          <TabsDeprecated
            tabs={typeTabs}
            value={value}
            onTabClick={OnTabClick}
            className={classNames('', {}, [className])}
          />
        }
      />
    );
  }
);
