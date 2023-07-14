import { lazy } from 'react';

export const ArticleEditPageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./ArticleEditPage')
);
