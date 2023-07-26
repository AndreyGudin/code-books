import type {
  CombinedState,
  Reducer,
  ReducersMapObject,
  AnyAction,
  EnhancedStore
} from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

import type { ProfileSchema } from 'features/EditableProfileCard';
import type { UserSchema } from 'entities/User';
import type { LoginSchema } from 'features/AuthByUsername';
import type { ArticleDetailsSchema } from 'entities/Article';
import type { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import type { AddCommentFormSchema } from 'features/addCommentForm';
import type { ArticlesPageSchema } from 'pages/ArticlePage';
import type { ScrollSaveSchema } from 'features/ScrollSave';
import type { rtkApi } from 'shared/api/rtkApi';

export interface StateSchema {
  user: UserSchema;
  scrollPosition: ScrollSaveSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  // Асинхронные редюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
  articleDetailsPage?: ArticleDetailsPageSchema;
}

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;

  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export type StateSchemaKey = keyof StateSchema;

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
