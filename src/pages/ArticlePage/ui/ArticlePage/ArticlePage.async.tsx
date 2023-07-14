import { lazy } from 'react';

export const ArticlePageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./ArticlePage')
);
