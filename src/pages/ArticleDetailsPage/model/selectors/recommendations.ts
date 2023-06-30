import type { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsCommentsIsLoading = (
  state: StateSchema
): boolean | undefined => state.articleDetailsRecommendations?.isLoading;
export const getArticleRecommendationsCommentsError = (
  state: StateSchema
): string | undefined => state.articleDetailsRecommendations?.error;
