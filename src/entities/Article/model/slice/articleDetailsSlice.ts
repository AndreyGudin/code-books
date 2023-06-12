import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import type { Article } from '../types/article';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined
};

const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.error = undefined;
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;