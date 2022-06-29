describe('Username changes on the profile with invalid input', () => {
  const changedName = "Bangbang";
  const resetName = "Nooner";
  const existingName = "Abab";

  beforeEach(() => {
    cy.login('n@n.ca', 'password');
    cy.visitProfile();
  })

  it('user changes their username to an accepted new name', () => {
    cy.findByRole('button', { name: /Change Username/i }).click();

    // enter a properly accepted name in the input field & submit
    cy.get('input[name=usernameInput]').type(changedName);
    cy.get('input[name=submitChange]').click();

    // confirm name change, verify success message, then reset the name for the next test
    cy.get('h2').should('contain', changedName);
    cy.get('h3').should('contain', 'Username successfully updated.');
    cy.resetName();
  })

  it('user incorrectly changes their name to be less than 4 characters', () => {
    cy.findByRole('button', { name: /Change Username/i }).click();

    // enter a name of improper length, verify error message & click submit
    cy.get('input[name=usernameInput]').type('A');
    cy.get('h3').should('contain', 'The new username must be 4 characters or longer.');
    cy.get('input[name=submitChange]').click();

    // ensure the name wasn't changed
    cy.get('h2').should('not.have.value', 'Welcome to your profile A!');
  })

  it('user incorrectly changes their name to an existing user\'s name', () => {
    cy.findByRole('button', { name: /Change Username/i }).click();

    // enter the username of an existing user & click submit
    cy.get('input[name=usernameInput]').type(existingName);
    cy.get('input[name=submitChange]').click();

    // verify the error message & ensure the name was not changed
    cy.get('h3').should('contain', 'That username already exists. Please choose a new one.');
    cy.get('h2').should('not.have.value', 'Welcome to your profile Abab!');
  })
})
