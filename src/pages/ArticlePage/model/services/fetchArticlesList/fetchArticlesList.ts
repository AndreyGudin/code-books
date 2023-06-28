import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticleType, type Article } from 'entities/Article';
import {
  getArticlesLimit,
  getArticlesOrder,
  getArticlesPageNum,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType
} from '../../selectors/articlesPageSelectors';
import { addQueryParams } from 'shared/lib/url/addQueryParams';

interface fetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  fetchArticlesListProps,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (args, { extra, rejectWithValue, getState }) => {
    const limit = getArticlesLimit(getState());
    const sort = getArticlesSort(getState());
    const order = getArticlesOrder(getState());
    const search = getArticlesSearch(getState());
    const page = getArticlesPageNum(getState());
    const type = getArticlesType(getState());

    try {
      addQueryParams({
        sort,
        order,
        search,
        type
      });
      const response = await extra.api.get<Article[]>(`/articles`, {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
