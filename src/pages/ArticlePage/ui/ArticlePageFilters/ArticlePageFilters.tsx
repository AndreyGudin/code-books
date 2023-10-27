import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';

import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlePageFilters.module.scss';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../model/lib/hooks/useArticleFilters';

interface ArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters: FC<ArticlePageFiltersProps> = memo(
  ({ className = '' }: ArticlePageFiltersProps) => {
    const { t } = useTranslation();
    const {
      view,
      sort,
      order,
      search,
      type,
      onChangeView,
      onChangeOrder,
      onChangeSort,
      onChangeSearch,
      onChangeType
    } = useArticleFilters();

    return (
      <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input
            onChange={onChangeSearch}
            value={search}
            placeholder={t('Поиск') ?? ''}
          />
        </Card>
        <ArticleTypeTabs
          onChangeType={onChangeType}
          value={type}
          className={cls.tabs}
        />
      </div>
    );
  }
);
