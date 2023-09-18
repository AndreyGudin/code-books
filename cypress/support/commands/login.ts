import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localStorage';

export const login = (
  username: string = 'testuser',
  password: string = '123'
): void => {
  cy.request({
    method: 'POST',
    url: `http://localhost:8000/login`,
    body: {
      grant_type: 'password',
      username,
      password
    }
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));

    cy.visit('/');
  });
};
