import { lazy } from 'react';

export const ProfilePageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./ProfilePage')
);
