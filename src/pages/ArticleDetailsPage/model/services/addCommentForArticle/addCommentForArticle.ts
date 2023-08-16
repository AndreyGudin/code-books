import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';
import type { Comment } from '@/entities/Comment';
import { getAuthUserData } from '@/entities/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>(
  'articleDetails/addCommentForArticle',
  async (text, { extra, rejectWithValue, getState, dispatch }) => {
    const userData = getAuthUserData(getState());
    const article = getArticleDetailsData(getState());

    if (userData === undefined || text === undefined || article === undefined) {
      return rejectWithValue('no data');
    }

    try {
      const response = await extra.api.post<Comment>(`/comments`, {
        articleId: article.id,
        userId: userData.id,
        text
      });
      if (Object.entries(response.data).length === 0) {
        throw new Error();
      }

      dispatch(fetchCommentsByArticleId(article.id)).catch((e) => {
        console.log(e);
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
