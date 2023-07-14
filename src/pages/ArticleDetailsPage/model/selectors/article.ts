import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from 'entities/Article';
import { getAuthUserData } from 'entities/User';

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getAuthUserData,
  (article, user) => {
    if (article === undefined || user === undefined) return false;
    return article.user.id === user.id;
  }
);
