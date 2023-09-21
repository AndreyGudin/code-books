import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localStorage';
import { User } from '../../../src/entities/User';

export const updateProfile = (firstName: string, lastName: string): void => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstName').clear().type(firstName);
  cy.getByTestId('ProfileCard.lastName').clear().type(lastName);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'user' },
    body: {
      id: '4',
      first: 'test',
      lastname: 'user',
      age: 465,
      currency: 'RUB',
      country: 'Russia',
      city: 'Moscow',
      username: 'ulbi tv',
      avatar:
        'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg'
    }
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName: string, lastName: string): Chainable<User>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
