// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000');
  cy.findByRole('button', { name: /Login\/Signup/i }).click();
  cy.get('input[name=loginEmail]').type(email);
  cy.get('input[name=loginPassword]').type(password);
  cy.findByRole('button', { name: /Log In/i }).click();
})

Cypress.Commands.add('visitLists', () => {
  cy.visit('http://localhost:3000/lists');
})

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: /Logout/i }).click();
  cy.url().should('eq', 'http://localhost:3000/');
})

Cypress.Commands.add('openLoginForm', () => {
  cy.visit('http://localhost:3000');
  cy.findByRole('button', { name: /Login\/Signup/i }).click();
})

Cypress.Commands.add('visitProfile', () => {
  cy.get('img').click();
  cy.url().should('include', '/profile');
})

Cypress.Commands.add('resetName', () => {
  cy.findByRole('button', { name: /Change Username/i }).click();
  cy.get('input[name=usernameInput]').type('Nooner');
  cy.get('input[name=submitChange]').click();
  cy.get('h2').should('contain', 'Nooner');
})

Cypress.Commands.add('visitQuizzes', () => {
  cy.visit('http://localhost:3000/quizzes');
  cy.findByRole('button', { name: /Start/i }).should('be.disabled');  // Start should always be disabled by default
})

// To be used in createInvalidQuizList below
Cypress.Commands.add('addNextWord', (word, listName) => {
  cy.get('input[name=queryBox]').clear();
  cy.get('input[name=queryBox]').type(word);
  cy.findByRole('button', { name: /Submit/i }).click();
  cy.contains(listName).click();
})

// This is technically bad practice, but it's quick and straightforward
Cypress.Commands.add('createInvalidQuizList', () => {
  const listName = 'testList';

  cy.visit('http://localhost:3000/lists');

  // create new list with name 'testList'
  cy.findByRole('button', { name: /\+ Create New List/i }).click();
  cy.get('input[name=newListInput]').type(listName);
  cy.findByRole('button', { name: /Add list/i }).click();

  cy.visit('http://localhost:3000/explore');

  // add first word 'temporary'
  cy.get('input[name=queryBox]').clear();
  cy.get('input[name=queryBox]').type('temporary');
  cy.findByRole('button', { name: /Submit/i }).click();
  cy.findByRole('button', { name: /\+ Add to list/i }).click();
  cy.contains(listName).click();

  // add the remaining 3 words
  cy.addNextWord('brandish', listName);
  cy.addNextWord('exonerated', listName);
})

// The same as above, except with a 4th word
Cypress.Commands.add('createValidQuizList', () => {
  cy.createInvalidQuizList();
  cy.addNextWord('magnanimous', 'testList');
})

Cypress.Commands.add('destroyQuizList', () => {
  cy.visit('http://localhost:3000/lists');

  if (cy.contains('Edit')) {
    cy.contains('Edit').click();
    cy.findByRole('button', { name: /Delete List/i }).click();
    cy.contains('Edit').should('not.exist');
  }
})
