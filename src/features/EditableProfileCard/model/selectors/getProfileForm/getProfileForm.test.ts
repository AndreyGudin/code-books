import type { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileForm.test', () => {
  test('should return form data', () => {
    const form = {
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
        form
      }
    };
    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
