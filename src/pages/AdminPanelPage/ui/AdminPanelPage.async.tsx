import { lazy } from 'react';

export const AdminPanelPageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./AdminPanelPage')
);
