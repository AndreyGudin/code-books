import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { type Article } from '@/entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  undefined,
  ThunkConfig<string>
>(
  'articlesDetailsPage/fetchArticleRecommendations',
  async (_, { extra, rejectWithValue, getState }) => {
    try {
      const response = await extra.api.get<Article[]>(`/articles`, {
        params: {
          _limit: 4
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
