import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const initAuthData = createAsyncThunk<
  User,
  undefined,
  ThunkConfig<string>
>(
  'user/initAuthData',
  async (newJsonSettings, { rejectWithValue, getState, dispatch }) => {
    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      ? JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) as string)
      : null;
    if (userId === null) return rejectWithValue('');

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      if (response === undefined) return rejectWithValue('');

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);