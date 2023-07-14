import { lazy } from 'react';

export const AboutPageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./AboutPage')
);
