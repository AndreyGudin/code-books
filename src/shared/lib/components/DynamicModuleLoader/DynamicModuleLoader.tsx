import { useDispatch, useStore } from 'react-redux';
import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import type { Reducer } from '@reduxjs/toolkit';

import type { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import type { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducers: ReducersList;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
  children,
  reducers
}: DynamicModuleLoaderProps) => {
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;
  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
      store.reducerManager.add(name, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
        store.reducerManager.remove(name);
        dispatch({ type: `@DESTROY ${name} reducer` });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};
