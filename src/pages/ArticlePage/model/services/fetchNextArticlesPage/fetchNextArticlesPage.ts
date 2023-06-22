import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlesHasMore,
  getArticlesIsLoading,
  getArticlesPageNum
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlePageSlice';
import { fetchArticlesList } from '../../services/fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  undefined,
  ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, { dispatch, getState }) => {
  const hasMore = getArticlesHasMore(getState());
  const page = getArticlesPageNum(getState());
  const isLoading = getArticlesIsLoading(getState());

  if (
    hasMore !== undefined &&
    hasMore &&
    isLoading !== undefined &&
    !isLoading
  ) {
    dispatch(articlesPageActions.setPage(page + 1));
    dispatch(
      fetchArticlesList({
        page: page + 1
      })
    ).catch((e) => {
      console.log(e);
    });
  }
});
