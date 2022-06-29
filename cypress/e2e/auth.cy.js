/* The signup process only works once because once the user is entered in the DB,
 * the system (correctly) throws an error.
 */
describe('Testing login process and invalid input in the account creation process', () => {
  const username = "testName";
  const email = "test@email.ca";
  const password = "password";
  const incorrectInput = "123";
  const googleEmail = "vocabtester1@gmail.com";
  const googlePass = "testerpass1!";

  beforeEach(() => {
    cy.openLoginForm();
  })

  it('user logs in with the provided account', () => {
    // enter info in the input fields and click "Log In"
    cy.get('input[name=loginEmail]').type(email);
    cy.get('input[name=loginPassword]').type(password);
    cy.findByRole('button', { name: /Log In/i }).click();

    // verify the user is logged in
    cy.findByRole('button', { name: /Logout/i }).should('exist');

    cy.logout();
  })

  it('user tries to create an account with a pre-existing email', () => {
    // click "Create New Account" and proceed with the creation process
    cy.findByRole('button', { name: /Create New Account/i }).click();
    cy.get('input[name=username]').type(username);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('input[name=confirmPassword]').type(password);

    // submit account details, then verify that an error is displayed
    cy.get('input[name=submitQuery]').click();
    cy.get('h3').should('contain', 'An account with that email already exists.');
  })

  it('user tries to create an account with an invalid length username', () => {
    cy.findByRole('button', { name: /Create New Account/i }).click();

    // enter a username below the accepted length & click submit
    cy.get('input[name=username]').type(incorrectInput);
    cy.get('input[name=submitQuery]').click();

    // verify the error message is present & accurate
    cy.get('h3').should('contain', 'Username must be at least 4 characters long.');
  })

  it('user doesn\'t match the password to confirmPassword correctly', () => {
    cy.findByRole('button', { name: /Create New Account/i }).click();

    // enter an incorrect password confirmation & click submit
    cy.get('input[name=password]').type(password);
    cy.get('input[name=confirmPassword]').type(incorrectInput);
    cy.get('input[name=submitQuery]').click();

    // verify the error message is present & accurate
    cy.get('h3').should('contain', 'The two passwords are not equal.');
  })

  it('user enters a password that isn\'t long enough', () => {
    cy.findByRole('button', { name: /Create New Account/i }).click();

    // enter a password of incorrect length & click submit
    cy.get('input[name=password]').type(incorrectInput);
    cy.get('input[name=submitQuery]').click();

    // verify the error message is present & accurate
    cy.get('h3').should('contain', 'The password must be 8 characters or longer.');
  })

  it('user enters an invalid email type', () => {
    cy.findByRole('button', { name: /Create New Account/i }).click();

    // enter an incorrect email confirmation & click submit
    cy.get('input[name=email]').type(incorrectInput);
    cy.get('input[name=submitQuery]').click();

    // verify the error message is present & accurate
    cy.get('h3').should('contain', 'Invalid e-mail address.');
  })
})
