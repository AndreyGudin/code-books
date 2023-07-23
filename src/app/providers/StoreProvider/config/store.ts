import { configureStore } from '@reduxjs/toolkit';
import type {
  CombinedState,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit';

import type { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { scrollSaveReducer } from 'features/ScrollSave';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    scrollPosition: scrollSaveReducer
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    preloadedState: initialState,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api
          }
        }
      })
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
