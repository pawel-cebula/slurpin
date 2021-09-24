import chaiColors from 'chai-colors';
import { baseApiURL } from '../../src/api';

chai.use(chaiColors);

describe('Feed', () => {
  beforeEach(() => {
    cy.login({ email: 'admin@gmail.com', password: 'password123' });
    cy.get('#nav-feed').click();
  });

  it('loads all existing checkins', () => {
    cy.contains('Recent checkins from Berlin');
    const token = Cypress.env('token');
    const options = {
      method: 'GET',
      url: `${baseApiURL}/checkins`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    cy.request(options).then(({ body }) =>
      cy.get('.feed-checkin').should('have.length', body.length)
    );
  });

  describe('checkin', () => {
    beforeEach(() => {
      cy.get('.feed-checkin').first().as('checkin');
    });
    it('has correct CSS applied', () => {
      cy.get('@checkin').within(() => {
        cy.get('.quote-container')
          .should('have.css', 'background-color')
          .and('be.colored', '#fffbe6');
        cy.get('.checkin-created-at')
          .should('have.css', 'color')
          .and('be.colored', '#bfbfbf');
      });
    });
    it('like button toggles color on click', () => {
      cy.get('@checkin').find('.card-button').first().as('like');
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
});
