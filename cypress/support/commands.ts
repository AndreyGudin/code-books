/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="cypress" />

import { login } from 'cypress/support/commands/login';

Cypress.Commands.add('login', login);
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
    }
  }
}

export {};
