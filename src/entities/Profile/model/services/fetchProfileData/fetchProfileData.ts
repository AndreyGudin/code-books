import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from 'app/providers/StoreProvider';
import type { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
  Profile,
  undefined,
  ThunkConfig<string>
>('profile/fetchProfileData', async (_, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<Profile>('/profile');

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
