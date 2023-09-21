import { selectByTestId } from 'cypress/helpers/selectByTestId';

let profileId: string;

describe('Пользователь заходит в профиль', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('И профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'test');
  });
  it('И редактирует его', () => {
    const newFirstName = 'new';
    const newLastName = 'lastname';
    cy.updateProfile(newFirstName, newLastName);
    cy.getByTestId('ProfileCard.firstName').should('have.value', newFirstName);
    cy.getByTestId('ProfileCard.lastName').should('have.value', newLastName);
  });

});
