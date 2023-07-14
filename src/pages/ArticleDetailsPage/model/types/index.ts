import type { articleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import type { articleDetailsPageRecommendationsSchema } from './ArticleDetailsPageRecommendations';

export interface ArticleDetailsPageSchema {
  comments: articleDetailsCommentsSchema;
  recommendations: articleDetailsPageRecommendationsSchema;
}
