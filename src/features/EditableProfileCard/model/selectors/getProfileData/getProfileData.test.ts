import type { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileData.test', () => {
  test('should return profile data', () => {
    const data = {
      username: 'admin',
      age: 18,
      city: 'Moscow',
      country: Country.Russia,
      currency: Currency.RUB,
      first: 'Andrei',
      lastname: 'Gudin'
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data
      }
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
