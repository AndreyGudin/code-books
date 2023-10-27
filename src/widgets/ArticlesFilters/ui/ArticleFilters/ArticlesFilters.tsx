import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { getFlexClasses } from '@/shared/ui/redesigned/Stack';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { Input } from '@/shared/ui/redesigned/Input';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/types';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newOrder: ArticleSortField) => void;
  type: ArticleType;
  onChangeType: (type: ArticleType) => void;
  search: string;
  onChangeSearch: (value: string) => void;
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = memo(
  ({
    className = '',
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    search,
    sort,
    type
  }: ArticlesFiltersProps) => {
    const { t } = useTranslation();

    return (
      <Card
        className={classNames(cls.ArticlesFilters, {}, [
          className,
          getFlexClasses({ direction: 'column', gap: '32' })
        ])}
        padding="24"
      >
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t('Поиск') ?? ''}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />

        <ArticleTypeTabs
          onChangeType={onChangeType}
          value={type}
          className={cls.tabs}
        />
      </Card>
    );
  }
);
