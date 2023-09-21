/// <reference types="cypress" />

import * as commonCommands from 'cypress/support/commands/common';
import * as profileCommands from 'cypress/support/commands/profile';
import * as articleCommands from 'cypress/support/commands/article';
import * as commentsCommands from 'cypress/support/commands/comments';
import * as ratingCommands from 'cypress/support/commands/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);

//
