import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { UserRole, getAuthUserData } from '@/entities/User';

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getAuthUserData,
  (article, user) => {
    if (article === undefined || user === undefined) return false;
    return article.user.id === user.id;
  }
);

export const getCanDeleteArticle = createSelector(
  getArticleDetailsData,
  getAuthUserData,
  (article, user) => {
    if (article === undefined || user === undefined) return false;
    return article.user.roles?.some((v) => v === UserRole.ADMIN);
  }
);
