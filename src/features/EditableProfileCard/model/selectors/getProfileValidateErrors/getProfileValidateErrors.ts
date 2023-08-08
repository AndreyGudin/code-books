import type { StateSchema } from 'app/providers/StoreProvider';
import type { ValidateProfileError } from '../../consts/const';

export const getProfileValidateErrors = (
  state: StateSchema
): ValidateProfileError[] | undefined => state.profile?.validateErrors;
