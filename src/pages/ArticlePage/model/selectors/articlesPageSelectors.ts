import type { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticlesIsLoading = (state: StateSchema): boolean =>
  state.articlesPage?.isLoading ?? false;
export const getArticlesError = (state: StateSchema): string | undefined =>
  state.articlesPage?.error;
export const getArticlesView = (state: StateSchema): ArticleView =>
  state.articlesPage?.view ?? ArticleView.GRID;
export const getArticlesLimit = (state: StateSchema): number =>
  state.articlesPage?.limit ?? 9;
export const getArticlesHasMore = (state: StateSchema): boolean | undefined =>
  state.articlesPage?.hasMore;
export const getArticlesPageNum = (state: StateSchema): number =>
  state.articlesPage?.page ?? 1;
export const getArticlesPageInited = (state: StateSchema): boolean =>
  state.articlesPage?._inited ?? false;
