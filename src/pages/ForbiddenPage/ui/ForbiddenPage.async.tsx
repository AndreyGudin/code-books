import { lazy } from 'react';

export const ForbiddenPageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./ForbiddenPage')
);
