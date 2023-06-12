import type { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsCommentsIsLoading = (
  state: StateSchema
): boolean | undefined => state.articleDetailsComments?.isLoading;
export const getArticleDetailsCommentsError = (
  state: StateSchema
): string | undefined => state.articleDetailsComments?.error;
