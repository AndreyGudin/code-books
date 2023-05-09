import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { FC, ReactNode } from 'react';

import { createReduxStore } from '../config/store';
import type { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import type { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';

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
  const navigate = useNavigate();

  const store = createReduxStore(
    initialState,
    asyncReducers as ReducersMapObject,
    navigate
  );

  return <Provider store={store}>{children}</Provider>;
};
