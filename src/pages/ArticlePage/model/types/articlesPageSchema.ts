import type { EntityState } from '@reduxjs/toolkit';
import type { Article, ArticleView } from 'entities/Article';
import type { ArticleSortField } from 'entities/Article/model/types/article';
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

  _inited: boolean;
}
