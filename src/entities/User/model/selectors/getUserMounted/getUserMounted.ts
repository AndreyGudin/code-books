import type { StateSchema } from 'app/providers/StoreProvider';

export const getUserMounted = (state: StateSchema): boolean | undefined =>
  state.user._mounted;
