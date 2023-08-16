import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Comment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>(
  'articleDetailsComments/fetchCommentsByArticleId',
  async (articleId, { extra, rejectWithValue }) => {
    if (articleId === undefined) {
      return rejectWithValue('error');
    }
    try {
      const response = await extra.api.get<Comment[]>(`/comments`, {
        params: {
          articleId,
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
