import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import {
  ArticleViewSelector,
  ArticleSortSelector,
  ArticleTypeTabs
} from '@/entities/Article';
import type {
  ArticleView,
  ArticleSortField,
  ArticleType
} from '@/entities/Article';
import { articlesPageActions } from '../../model/slice/articlePageSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
  getArticlesOrder,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType,
  getArticlesView
} from '../../model/selectors/articlesPageSelectors';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import type { SortOrder } from '@/shared/types/types';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { classNames } from '@/shared/lib/classNames/classNames';
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
    const type = useSelector(getArticlesType);
    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true })).catch((e) => {
        console.log(e);
      });
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
      },
      [dispatch]
    );

    const onChangeOrder = useCallback(
      (order: SortOrder) => {
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    const onChangeSort = useCallback(
      (sort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    const onChangeSearch = useCallback(
      (value: string) => {
        dispatch(articlesPageActions.setSearch(value));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
      },
      [dispatch, debouncedFetchData]
    );

    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
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
        <ArticleTypeTabs
          onChangeType={onChangeType}
          value={type}
          className={cls.tabs}
        />
      </div>
    );
  }
);
