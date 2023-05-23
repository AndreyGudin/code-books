import { Country } from 'entities/Country';
import { fetchProfileData } from './fetchProfileData';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Currency } from 'entities/Currency';

const data = {
  username: 'admin',
  age: 18,
  city: 'Moscow',
  country: Country.Russia,
  currency: Currency.RUB,
  first: 'Andrei',
  lastname: 'Gudin'
};

describe('fetchProfileData.test', () => {
  test('success login', async () => {
    // const action = loginByUserName({ username: '123', password: '123' });
    // const result = await action(dispatch, getState, undefined);
    // console.log(result);

    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk(undefined);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    // const action = loginByUserName({ username: '123', password: '123' });
    // const result = await action(dispatch, getState, undefined);

    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk(undefined);
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
