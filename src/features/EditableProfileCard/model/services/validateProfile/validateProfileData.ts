import type { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../consts/const';

export const validateProfileData = (
  profile: Profile
): ValidateProfileError[] => {
  const { first, lastname, age, country } = profile;
  const errors: ValidateProfileError[] = [];

  if (Object.entries(profile).length === 0) {
    errors.push(ValidateProfileError.NO_DATA);
    return errors;
  }

  if (first?.length === 0 || lastname?.length === 0) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }
  if (!Number.isInteger(age) || age === 0) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  if (country?.length === 0 || country === undefined) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }

  return errors;
};
