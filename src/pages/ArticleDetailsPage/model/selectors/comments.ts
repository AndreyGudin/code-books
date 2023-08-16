import type { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsCommentsIsLoading = (
  state: StateSchema
): boolean | undefined => state.articleDetailsPage?.comments.isLoading;
export const getArticleDetailsCommentsError = (
  state: StateSchema
): string | undefined => state.articleDetailsPage?.comments.error;
