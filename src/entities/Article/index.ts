export {
  ArticleDetails,
  DeprecatedArticleDetails
} from './ui/ArticleDetails/ArticleDetails';
export type { Article, ArticleBlock } from './model/types/article';
export {
  ArticleView,
  ArticleSortField,
  ArticleType,
  ArticleBlockType
} from './model/consts/const';

export {
  articleDetailsActions,
  articleDetailsReducer
} from './model/slice/articleDetailsSlice';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export { ArticleList } from './ui/ArticleList/ArticleList';
export {
  getArticleDetailsData,
  getArticleDetailsIsLoading
} from './model/selectors/articleDetails';
export { RedesignedArticleDetailsComponent } from './ui/ArticleDetails/RedesignedArticleDetailsComponent';
export { DeprecatedArticleDetailsComponent } from './ui/ArticleDetails/DeprecatedArticleDetailsComponent';
export { fetchArticleById } from './model/services/fetchArticleById/fetchArticleById';
export { useGetArticleOnMount } from './model/services/useGetArticleOnMount/useGetArticleOnMount';
