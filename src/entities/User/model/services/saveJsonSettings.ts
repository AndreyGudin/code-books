import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getAuthUserData } from '../selectors/getAuthUserData/getAuthUserData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../api/userApi';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>(
  'user/saveJsonSettings',
  async (newJsonSettings, { rejectWithValue, getState, dispatch }) => {
    const userData = getAuthUserData(getState());
    const currentSettings = getJsonSettings(getState());

    if (userData === undefined) return rejectWithValue('');

    try {
      const response = await dispatch(
        setJsonSettingsMutation({
          userId: userData.id,
          jsonSettings: { ...currentSettings, ...newJsonSettings }
        })
      ).unwrap();

      if (response.jsonSettings === undefined) return rejectWithValue('');

      return response.jsonSettings;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
