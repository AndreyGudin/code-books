import { lazy } from 'react';

export const SettingsPageAsync = lazy(
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  () => import('./SettingsPage')
);
