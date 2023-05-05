import { combineReducers } from '@reduxjs/toolkit';
import type { Reducer, ReducersMapObject, AnyAction } from '@reduxjs/toolkit';
import type {
  ReducerManager,
  StateSchema,
  StateSchemaKey
} from './StateSchema';

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: StateSchemaKey[] = [];

  return {
    getReducerMap: () => reducers,

    reduce: (state: StateSchema, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      console.log('key', key);
      if (key === undefined || reducers[key] !== undefined) {
        return;
      }

      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StateSchemaKey) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (key === undefined || reducers[key] === undefined) {
        return;
      }

      delete reducers[key];

      keysToRemove.push(key);

      combinedReducer = combineReducers(reducers);
    }
  };
}
