import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import userEvent from '@testing-library/user-event';

import { EditableProfileCard } from './EditableProfileCard';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileReducer } from '../../model/slice/profileSlice';
import { $api } from 'shared/api/api';

const data = {
  id: '1',
  username: 'admin',
  age: 18,
  city: 'Moscow',
  country: Country.Russia,
  currency: Currency.RUB,
  first: 'admin',
  lastname: 'admin'
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data,
      form: data
    },
    user: {
      authData: {
        id: '1',
        username: 'admin'
      }
    }
  },
  asyncReducers: { profile: profileReducer }
};

describe('features/EditableProfileCard', () => {
  test('Режим readonly должен переключиться', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton'));
  });

  test('При отмене значения обнуляются', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'user');

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('user');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    );

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('admin');
  });

  test('Должна появиться ошибка', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    );

    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph')
    ).toBeInTheDocument();
  });

  test('Если нет ошибок валидации, то должен уйти put запрос', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options);
    const mockPutReq = jest.spyOn($api, 'put');
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
