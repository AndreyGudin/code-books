import { combineReducers } from '@reduxjs/toolkit';
import type { ArticleDetailsPageSchema } from '../types';
import { articleDetailsPageRecommendationsSliceReducer } from './articleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsSliceReducer,
    comments: articleDetailsCommentsReducer
  });
