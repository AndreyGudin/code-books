import type { StateSchema } from 'app/providers/StoreProvider';
import type { Profile } from 'entities/Profile/model/types/profile';

export const getProfileForm = (state: StateSchema): Profile | undefined =>
  state.profile?.form;
