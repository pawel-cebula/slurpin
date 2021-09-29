import chaiColors from 'chai-colors';
import { baseApiTestURL } from '../../src/api';
import baseAppURL from '../../src/constants/baseAppURL';

chai.use(chaiColors);

const samplePlaceId = 'c8647c26-0c20-414a-88ca-35906b346585';

describe('PlaceDetail', () => {
  beforeEach(() => {
    cy.login({ email: 'admin@gmail.com', password: 'password123' });
    cy.visit(`${baseAppURL}/places/${samplePlaceId}`);
  });

  it('displays information about the place and its checkins', () => {
    cy.contains('More information about Cocolo Ramen Mitte');
    const token = Cypress.env('token');
    const options = {
      method: 'GET',
      url: `${baseApiTestURL}/places/${samplePlaceId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    cy.request(options).then(({ body }) => {
      cy.get('.checkin-small').should('have.length', body.checkins.length);
    });
  });

  it('like button toggles color on click', () => {
    cy.get('.card-button').first().as('like');
    cy.get('@like').then(($like) => {
      if ($like.hasClass('card-button-clicked')) {
        cy.get('@like')
          .should('have.css', 'color')
          .and('be.colored', '#1890ff');
        cy.get('@like').click();
        cy.get('@like')
          .should('have.css', 'color')
          .and('be.colored', '#8c8c8c');
      } else {
        cy.get('@like')
          .should('have.css', 'color')
          .and('be.colored', '#8c8c8c');
        cy.get('@like').click();
        cy.get('@like')
          .should('have.css', 'color')
          .and('be.colored', '#1890ff');
      }
    });
  });
});
