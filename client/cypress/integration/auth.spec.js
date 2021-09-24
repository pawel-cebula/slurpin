import randomstring from 'randomstring';
import baseAppURL from '../../src/constants/baseAppURL';

const randomUsername = randomstring.generate(12);
const randomPassword = randomstring.generate(12);
const randomWrongPassword = randomstring.generate(10);

describe('Authentication', () => {
  it('redirects to login page if not authenticated', () => {
    cy.visit(`${baseAppURL}/feed`);
    cy.contains('You need to log in to access this page');
    cy.contains('Log in to access the app');
    cy.visit(`${baseAppURL}/places`);
    cy.contains('You need to log in to access this page');
    cy.contains('Log in to access the app');
    cy.visit(`${baseAppURL}/new-checkin`);
    cy.contains('You need to log in to access this page');
    cy.contains('Log in to access the app');
  });

  it('registers a new user', () => {
    cy.visit(`${baseAppURL}/register`);
    cy.get('#username').type(randomUsername);
    cy.get('#email').type(`${randomUsername}@gmail.com`);
    cy.get('#password').type(randomPassword);
    cy.get('[type="submit"]').click();
    cy.contains('Successfully registered an account');
  });

  it('returns error when logging in with invalid credentils', () => {
    cy.visit(`${baseAppURL}/login`);
    cy.get('#email').type(`${randomUsername}@gmail.com`);
    cy.get('#password').type(`${randomWrongPassword}`);
    cy.get('[type="submit"]').click();
    cy.contains('Failed login attempt, please try again');
    cy.contains('Log in to access the app');
  });

  it('logs in a new user with valid credentials', () => {
    cy.visit(`${baseAppURL}/login`);
    cy.get('#email').type(`${randomUsername}@gmail.com`);
    cy.get('#password').type(`${randomPassword}`);
    cy.get('[type="submit"]').click();
    cy.contains('Recent checkins from Berlin');
  });

  it('logs out the logged in user', () => {
    cy.visit(`${baseAppURL}/login`);
    cy.get('#email').type(`${randomUsername}@gmail.com`);
    cy.get('#password').type(`${randomPassword}`);
    cy.get('[type="submit"]').click();
    cy.contains('Recent checkins from Berlin');
    cy.get('#nav-logout').click();
    cy.contains('Log in to access the app');
    cy.visit(`${baseAppURL}/feed`);
    cy.contains('You need to log in to access this page');
    cy.contains('Log in to access the app');
  });
});
