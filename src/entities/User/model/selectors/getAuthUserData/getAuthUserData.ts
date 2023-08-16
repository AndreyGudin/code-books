import type { StateSchema } from '@/app/providers/StoreProvider';
import type { User } from '../../types/user';

export const getAuthUserData = (state: StateSchema): User | undefined =>
  state.user.authData;
