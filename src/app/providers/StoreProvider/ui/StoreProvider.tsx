import { Provider } from 'react-redux';
import type { FC, ReactNode } from 'react';

import { createReduxStore } from '../config/store';
import type { StateSchema } from '@/app/providers/StoreProvider';
import type { ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: StateSchema;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  initialState,
  asyncReducers
}: StoreProviderProps) => {
  const store = createReduxStore(
    initialState,
    asyncReducers as ReducersMapObject
  );

  return <Provider store={store}>{children}</Provider>;
};
