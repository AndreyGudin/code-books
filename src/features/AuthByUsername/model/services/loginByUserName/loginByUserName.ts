import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from 'entities/User';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUserName = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>('login/loginByUserName', async ({ username, password }, thunkAPI) => {
  try {
    const response = await axios.post<User>('http://localhost:8000.login', {
      username,
      password
    });
    if (Object.entries(response.data).length === 0) {
      throw new Error();
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('error');
  }
});
