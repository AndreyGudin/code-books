import type { StateSchema } from 'app/providers/StoreProvider';
import type { User } from 'entities/User/model/types/user';

export const getAuthUserData = (state: StateSchema): User | undefined =>
  state.user.authData;
