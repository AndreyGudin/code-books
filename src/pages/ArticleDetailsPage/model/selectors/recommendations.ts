import type { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleRecommendationsCommentsIsLoading = (
  state: StateSchema
): boolean | undefined => state.articleDetailsPage?.recommendations.isLoading;
export const getArticleRecommendationsCommentsError = (
  state: StateSchema
): string | undefined => state.articleDetailsPage?.recommendations?.error;
