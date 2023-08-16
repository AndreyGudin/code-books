import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlePageSlice';
import { fetchArticlesList } from '../../services/fetchArticlesList/fetchArticlesList';
import type { SortOrder } from '@/shared/types/types';
import type { ArticleSortField, ArticleType } from '@/entities/Article';

export const initArticlesPage = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (searchParams, { dispatch, getState }) => {
    const inited = getArticlesPageInited(getState());
    if (!inited) {
      searchParams.forEach((value, key) => {
        switch (key) {
          case 'order':
            dispatch(articlesPageActions.setOrder(value as SortOrder));
            break;
          case 'sort':
            dispatch(articlesPageActions.setSort(value as ArticleSortField));
            break;
          case 'search':
            dispatch(articlesPageActions.setSearch(value));
            break;
          case 'type':
            dispatch(articlesPageActions.setType(value as ArticleType));
            break;
          default:
            break;
        }
      });

      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({})).catch((e) => {
        console.log(e);
      });
    }
  }
);
