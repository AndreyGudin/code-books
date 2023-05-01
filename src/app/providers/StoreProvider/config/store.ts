import { configureStore } from '@reduxjs/toolkit';
import type { ReducersMapObject } from '@reduxjs/toolkit';

import type { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createReduxStore(initialState?: StateSchema) {
  const rooReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer
  };
  return configureStore<StateSchema>({
    reducer: rooReducers,
    preloadedState: initialState,
    devTools: __IS_DEV__
  });
}
