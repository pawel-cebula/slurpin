import baseAppURL from '../../src/constants/baseAppURL';
import { baseApiTestURL } from '../../src/api';

Cypress.Commands.add('login', ({ email, password }) => {
  cy.request('POST', `${baseApiTestURL}/auth/login`, {
    email,
    password,
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body));
    Cypress.env('token', body.token);
    Cypress.env('username', body.username);
    cy.visit(baseAppURL);
  });
});
