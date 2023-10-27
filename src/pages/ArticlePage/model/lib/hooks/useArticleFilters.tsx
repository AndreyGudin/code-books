import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticleView, ArticleSortField, ArticleType } from '@/entities/Article';
import {
  getArticlesView,
  getArticlesSort,
  getArticlesOrder,
  getArticlesSearch,
  getArticlesType
} from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlePageSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { SortOrder } from '@/shared/types/types';

interface UseArticleFiltersType {
  view: ArticleView;
  sort: ArticleSortField;
  order: SortOrder;
  search: string;
  type: ArticleType;
  onChangeView: (view: ArticleView) => void;
  onChangeOrder: (order: SortOrder) => void;
  onChangeSort: (sort: ArticleSortField) => void;
  onChangeSearch: (value: string) => void;
  onChangeType: (value: ArticleType) => void;
}

export const useArticleFilters = (): UseArticleFiltersType => {
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

  return {
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
  };
};
