import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profile';
import type { Profile } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfile/validateProfileData';

export const updateProfileData = createAsyncThunk<
  Profile,
  undefined,
  ThunkConfig<ValidateProfileError[]>
>(
  'profile/updateProfileData',
  async (_, { extra, rejectWithValue, getState }) => {
    const formData = getProfileForm(getState());
    const errors = validateProfileData(formData ?? {});

    if (errors.length > 0) {
      return rejectWithValue(errors);
    }

    try {
      const response = await extra.api.put<Profile>(
        `profile/${formData?.id ?? ''}`,
        formData
      );
      if (Object.entries(response.data).length === 0) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  }
);
