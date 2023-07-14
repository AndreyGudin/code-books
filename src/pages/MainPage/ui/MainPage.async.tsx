import { lazy } from 'react';

export const MainPageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./MainPage')
);
