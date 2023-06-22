import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from 'app/providers/StoreProvider';
import type { Article } from 'entities/Article';
import { getArticlesLimit } from '../../selectors/articlesPageSelectors';

interface fetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  fetchArticlesListProps,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (args, { extra, rejectWithValue, getState }) => {
    const { page = 1 } = args;
    const limit = getArticlesLimit(getState());
    try {
      const response = await extra.api.get<Article[]>(`/articles`, {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
