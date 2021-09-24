import randomstring from 'randomstring';
import baseAppURL from '../../src/constants/baseAppURL';

describe('New Checkin', () => {
  beforeEach(() => {
    cy.login({ email: 'admin@gmail.com', password: 'password123' });
    cy.get('#nav-new-checkin').click();
  });

  it('has a form with all the fields', () => {
    cy.get('h1').contains('Add a new checkin');
    cy.get('[for="placeId"]');
    cy.get('#placeId').should('have.attr', 'type', 'search');
    cy.get('[for="bowl"]');
    cy.get('#bowl').should('have.attr', 'type', 'search');
    cy.get('[for="review"]');
    cy.get('#review');
    cy.get('[for="rating"]');
    cy.get('.ant-rate').children().should('have.length', 5);
    cy.get('[type="submit"]')
      .should('have.text', 'Submit')
      .and('have.class', 'ant-btn-primary');
  });

  it('adds a new checkin with valid inputs', () => {
    const randomReview = randomstring.generate(12);
    cy.get('#placeId').type('Cocolo Ramen Mitte{enter}');
    cy.get('#bowl')
      .click()
      .then(() => {
        cy.get('[title="Tonkotsu"]').click();
      });
    cy.get('#review').type(randomReview);
    cy.get('.ant-rate').children().last().click();
    cy.get('[type="submit"]').click();
    cy.contains('Successfully added new checkin');
    cy.contains('Recent checkins from Berlin');
    cy.get('.feed-checkin').first().contains(randomReview);
    cy.visit(`${baseAppURL}/feed`);
    cy.contains('Recent checkins from Berlin');
    cy.get('.feed-checkin').first().contains(randomReview);
  });

  it('does not add a checkin with invalid inputs', () => {
    const randomReview = randomstring.generate(12);
    cy.get('#placeId').type('Cocolo Ramen Mitte{enter}');
    cy.get('#review').type(randomReview);
    cy.get('.ant-rate').children().last().click();
    cy.get('[type="submit"]').click();
    cy.contains('Please select the bowl type');
  });
});
