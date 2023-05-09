import { createAsyncThunk } from '@reduxjs/toolkit';

import { userActions } from 'entities/User';
import type { User } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import type { ThunkConfig } from 'app/providers/StoreProvider';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUserName = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>(
  'login/loginByUserName',
  async ({ username, password }, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<User>('/login', {
        username,
        password
      });
      if (Object.entries(response.data).length === 0) {
        throw new Error();
      }
      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        JSON.stringify(response.data)
      );
      dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
