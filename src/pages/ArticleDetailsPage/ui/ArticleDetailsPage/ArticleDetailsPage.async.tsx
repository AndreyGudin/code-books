import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./ArticleDetailsPage')
);
