import { Provider } from 'react-redux';
import type { FC, ReactNode } from 'react';

import { createReduxStore } from '../config/store';
import type { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: StateSchema;
}

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  initialState
}: StoreProviderProps) => {
  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
