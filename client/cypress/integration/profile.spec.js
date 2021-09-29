import errorCodes from '../../src/constants/errorCodes';

describe('Profile', () => {
  beforeEach(() => {
    cy.login({ email: 'admin@gmail.com', password: 'password123' });
    cy.get('#nav-feed').click();
  });

  describe('of another user', () => {
    beforeEach(() => {
      const username = Cypress.env('username');
      cy.get('.checkin-user-profile')
        .filter(`:not(:contains("${username}"))`)
        .first()
        .as('user');
      cy.get('@user').click();
    });
    // eslint-disable-next-line func-names
    it('displays information about another user', function () {
      const user = this.user[0];
      console.log('user.innerText', user.innerText);
      cy.contains(user.innerText);
    });

    it('does not have a link to edit user profile', () => {
      cy.get('.user-profile-edit').should('not.exist');
    });

    it('cannot be edited through directly typed URL', () => {
      cy.url().then((currentURL) => {
        cy.visit(`${currentURL}/edit`);
        cy.contains(errorCodes.unauthorizedAccess);
      });
    });
  });

  describe('of the logged in user', () => {
    beforeEach(() => {
      cy.get('#nav-profile').click();
    });

    it('has a link to edit user profile', () => {
      cy.get('.user-profile-edit').should('exist');
    });

    it('cannot be edited with invalid inputs', () => {
      cy.get('.user-profile-edit').click();
      cy.contains('Edit User Profile');
      cy.get('#username').clear().type('a');
      cy.get('[type="submit"]').click();
      cy.contains('Please input your username (min. 3 characters)!');
    });

    it('can be edited with valid inputs', () => {
      const username = Cypress.env('username');
      const usernameSuffix = 'x';
      cy.get('.user-profile-edit').click();
      cy.contains('Edit User Profile');
      cy.get('#username').type(usernameSuffix);
      cy.get('[type="submit"]').click();
      cy.contains(`${username}${usernameSuffix}`);
    });
  });
});
