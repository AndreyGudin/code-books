import type { StateSchema } from 'app/providers/StoreProvider';
import type { ValidateProfileError } from 'entities/Profile/model/types/profile';

export const getProfileValidateErrors = (
  state: StateSchema
): ValidateProfileError[] | undefined => state.profile?.validateErrors;
