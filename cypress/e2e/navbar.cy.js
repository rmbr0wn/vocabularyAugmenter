describe('The links should work when logged in, and re-direct when not logged in', () => {

  it('Valid link testing while logged in', () => {
    cy.login('n@n.ca', 'password');
    cy.url().should('eq', 'http://localhost:3000/');

    // visit Word Lists --> Word Explorer --> Quizzes --> Home
    cy.contains('Word Lists').click();
    cy.url().should('include', '/lists');

    cy.contains('Word Explorer').click();
    cy.url().should('include', '/explore');

    cy.contains('Quizzes').click();
    cy.url().should('include', '/quizzes');

    cy.contains('Home').click();
    cy.url().should('include', '/');
  })

  it('Link testing while NOT logged in', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('eq', 'http://localhost:3000/');

    // visit Word Lists --> Word Explorer --> Quizzes --> Home
    cy.contains('Word Lists').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.contains('Word Explorer').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.contains('Quizzes').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.contains('Home').click();
    cy.url().should('eq', 'http://localhost:3000/');
  })
})
