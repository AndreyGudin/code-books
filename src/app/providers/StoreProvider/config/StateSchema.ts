import type {
  CombinedState,
  Reducer,
  ReducersMapObject,
  AnyAction,
  EnhancedStore
} from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

import type { CounterSchema } from 'entities/Counter';
import type { ProfileSchema } from 'entities/Profile';
import type { UserSchema } from 'entities/User';
import type { LoginSchema } from 'features/AuthByUsername';
import type { ArticleDetailsSchema } from 'entities/Article';
import type {
  articleDetailsCommentsSchema,
  articleDetailsPageRecommendationsSchema
} from 'pages/ArticleDetailsPage';
import type { AddCommentFormSchema } from 'features/addCommentForm';
import type { ArticlesPageSchema } from 'pages/ArticlePage';
import type { ScrollSaveSchema } from 'features/ScrollSave';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollPosition: ScrollSaveSchema;

  // Асинхронные редюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: articleDetailsCommentsSchema;
  articleDetailsRecommendations?: articleDetailsPageRecommendationsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
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
