import { Country } from 'entities/Country';
import { profileActions, profileReducer } from './profileSlice';
import { ValidateProfileError } from 'entities/Profile/model/types/profile';
import type { ProfileSchema } from 'entities/Profile/model/types/profile';
import { Currency } from 'entities/Currency';
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData/updateProfileData';

const data = {
  username: 'admin',
  age: 18,
  city: 'Moscow',
  country: Country.Russia,
  currency: Currency.RUB,
  first: 'Andrei',
  lastname: 'Gudin'
};

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({ readonly: true, ValidityState: undefined, data, form: data });
  });

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '' } };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: '12345' })
      )
    ).toEqual({ form: { username: '12345' } });
  });

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR]
    };
    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({ isLoading: true, validateErrors: undefined });
  });

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '', undefined)
      )
    ).toEqual({
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      form: data,
      data
    });
  });
});
