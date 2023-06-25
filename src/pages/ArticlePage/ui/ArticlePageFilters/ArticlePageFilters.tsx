import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { ArticleViewSelector, ArticleSortSelector } from 'entities/Article';
import type { ArticleView, ArticleSortField } from 'entities/Article';
import { articlesPageActions } from '../../model/slice/articlePageSlice';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import {
  getArticlesOrder,
  getArticlesSearch,
  getArticlesSort,
  getArticlesView
} from '../../model/selectors/articlesPageSelectors';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import type { SortOrder } from 'shared/types/types';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlePageFilters.module.scss';

interface ArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters: FC<ArticlePageFiltersProps> = memo(
  ({ className = '' }: ArticlePageFiltersProps) => {
    const { t } = useTranslation();
    const view = useSelector(getArticlesView);
    const sort = useSelector(getArticlesSort);
    const order = useSelector(getArticlesOrder);
    const search = useSelector(getArticlesSearch);
    const dispatch = useAppDispatch();

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
      },
      [dispatch]
    );

    const onChangeOrder = useCallback(
      (order: SortOrder) => {
        dispatch(articlesPageActions.setOrder(order));
      },
      [dispatch]
    );

    const onChangeSort = useCallback(
      (sort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sort));
      },
      [dispatch]
    );

    const onChangeSearch = useCallback(
      (value: string) => {
        dispatch(articlesPageActions.setSearch(value));
      },
      [dispatch]
    );

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
      </div>
    );
  }
);
