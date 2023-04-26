import { configureStore } from '@reduxjs/toolkit';
import type { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {},
    preloadedState: initialState,
    devTools: __IS_DEV__
  });
}
