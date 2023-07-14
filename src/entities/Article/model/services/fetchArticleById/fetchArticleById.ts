import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from 'app/providers/StoreProvider';
import type { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>(
  'articleDetails/fetchArticleById',
  async (articleId, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Article>(`/articles/${articleId}`, {
        params: {
          _expand: 'user'
        }
      });
      if (Object.entries(response.data).length === 0) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
