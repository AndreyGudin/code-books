import type { EntityState } from '@reduxjs/toolkit';
import type {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView
} from 'entities/Article';

import type { SortOrder } from 'shared/types/types';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
  view: ArticleView;

  page: number;
  limit?: number;
  hasMore: boolean;

  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
