/* All tests are executed under the assumption that there are no previous lists
 * present, prior to execution of the tests.
 *
 * This file also includes testing for WordExplorer, due to it's coupling with
 * lists.
 */
describe('Executing CRUD operations on lists', () => {
  const email = "n@n.ca";
  const password = "password";
  const initialListName = "TestList1";
  const changedListName = "ChangedList"
  const testWord = "temporary";

  beforeEach(() => {
    cy.login(email, password);
    cy.wait(500);
    cy.visitLists();
  })

  afterEach(() => {
    cy.logout();
  })

  it('user creates + views the created list', () => {
    cy.findByRole('button', { name: /\+ Create New List/i }).click();

    // enter new list title and click add list
    cy.get('input[name=newListInput]').type(initialListName);
    cy.findByRole('button', { name: /Add list/i }).click();

    // verify the list has been added & with the correct name
    cy.get('h5').should('contain', 'List successfully created.');
    cy.contains(initialListName).should('exist');
  })

  it('user changes the name of the created list', () => {
    cy.contains('Edit').click();

    // change list name & verify it has been changed
    cy.get('input[name=editNameInput]').clear();
    cy.get('input[name=editNameInput]').type(changedListName);
    cy.findByRole('button', { name: /Save Changes/i }).click();
    cy.contains(changedListName);
    cy.contains(initialListName).should('not.exist');
  })

  it('user navigates to /explore, searches for a word and adds it to the list', () => {
    // navigate to /explore
    cy.contains('Word Explorer').click();
    cy.url().should('include', '/explore');

    // click on the search bar and query for a word
    cy.get('input[name=queryBox]').clear();
    cy.get('input[name=queryBox]').type(testWord);
    cy.findByRole('button', { name: /Submit/i }).click();

    // verify the word query has been returned
    cy.get('h2').should('contain', testWord);

    // click "+ Add to list" and select a list from the dropdown
    cy.findByRole('button', { name: /\+ Add to list/i }).click();
    cy.contains(changedListName).click();
  })

  it('user checks to see that the list has the added word, then deletes it', () => {
    // verify the word exists
    cy.contains(testWord);

    // click edit and delete the word
    cy.contains('Edit').click();
    cy.findByRole('button', { name: /X/i }).click();

    // verify the word no longer exists
    cy.contains(testWord).should('not.exist');
  })

  it('user deletes the list', () => {
    cy.contains('Edit').click();

    cy.findByRole('button', { name: /Delete List/i }).click();

    // verify the list no longer exists
    cy.contains(changedListName).should('not.exist');
  })
})
