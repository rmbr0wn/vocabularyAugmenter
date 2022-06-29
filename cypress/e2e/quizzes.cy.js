describe('Walking through the quiz game and checking for invalid input handling', () => {
  beforeEach(() => {
    cy.login('n@n.ca', 'password');
    cy.wait(500);
  })

  afterEach(() => {
    cy.destroyQuizList();
  })

  it('Saving an invalid list and trying to click start', () => {
    cy.createInvalidQuizList();
    cy.visitQuizzes();

    // fill out options
    cy.findByRole('button', { name: /Options/i }).click();
    cy.findByRole('button', { name: /\+/i }).click();
    cy.findByRole('button', { name: /Save Changes/i }).click();

    // verify error message + start still disabled
    cy.get('h6').should('contain', 'You need to have at least 4 words in your lists in total.');
    cy.findByRole('button', { name: /Start/i }).should('be.disabled');
  })

  it('Clicking "Save Changes" without any added lists', () => {
    cy.createInvalidQuizList();
    cy.visitQuizzes();

    // click through options
    cy.findByRole('button', { name: /Options/i }).click();
    cy.findByRole('button', { name: /Save Changes/i }).click();

    // verify error message + start still disabled
    cy.get('h6').should('contain', 'You need to add lists to start the Quiz.');
    cy.findByRole('button', { name: /Start/i }).should('be.disabled');
  })

  it('Add a valid list and play through the game until the end', () => {
    cy.createValidQuizList();
    cy.visitQuizzes();

    // add list and save changes
    cy.findByRole('button', { name: /Options/i }).click();
    cy.findByRole('button', { name: /\+/i }).click();
    cy.findByRole('button', { name: /Save Changes/i }).click();

    // ensure start button is active and begin the quiz
    cy.findByRole('button', { name: /Start/i }).should('not.be.disabled');
    cy.findByRole('button', { name: /Start/i }).click();

    // move through the quiz, choosing "temporary" for every answer
    for(let i = 0; i < 5; i++) {
      cy.contains('temporary').click();
      cy.findByRole('button', { name: /Next/i }).click();
    }

    // ensure the game is finished, and return home
    cy.get('p').should('contain', 'All done!');
    cy.findByRole('button', { name: /Exit Quiz/i }).click();
    cy.url().should('eq', 'http://localhost:3000/');
  })

  it('Add a valid list, start the game, and then use the "Exit Quiz" feature', () => {
    cy.createValidQuizList();
    cy.visitQuizzes();

    // add list and save changes
    cy.findByRole('button', { name: /Options/i }).click();
    cy.findByRole('button', { name: /\+/i }).click();
    cy.findByRole('button', { name: /Save Changes/i }).click();

    // ensure start button is active and begin the quiz
    cy.findByRole('button', { name: /Start/i }).should('not.be.disabled');
    cy.findByRole('button', { name: /Start/i }).click();

    // quit the quiz and ensure re-direction to home
    cy.findByRole('button', { name: /Exit Quiz/i }).click();
    cy.url().should('eq', 'http://localhost:3000/');
  })

})
