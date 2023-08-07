import type { Profile } from 'entities/Profile';
import type { ValidateProfileError } from '../consts/const';

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileError[];
}
