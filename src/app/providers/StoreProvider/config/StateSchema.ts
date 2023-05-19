import type {
  CombinedState,
  Reducer,
  ReducersMapObject,
  AnyAction,
  EnhancedStore
} from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { NavigateOptions, To } from 'react-router-dom';

import type { CounterSchema } from 'entities/Counter';
import type { ProfileSchema } from 'entities/Profile';
import type { UserSchema } from 'entities/User';
import type { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export type StateSchemaKey = keyof StateSchema;

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
