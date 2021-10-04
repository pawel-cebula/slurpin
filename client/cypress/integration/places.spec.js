import { baseApiTestURL } from '../../src/api';

describe('Places', () => {
  beforeEach(() => {
    cy.login({ email: 'admin@gmail.com', password: 'password123' });
    cy.get('#nav-places').click();
  });

  it('loads all existing places', () => {
    cy.contains('Ramen places in Berlin');
    const token = Cypress.env('token');
    const options = {
      method: 'GET',
      url: `${baseApiTestURL}/places`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    cy.request(options).then(({ body }) => {
      cy.get('.places-place').should('have.length', body.length);
    });
  });

  it('sorts places by number of checkins', () => {
    const extractCount = (element) =>
      parseInt(element.innerText.match(/[0-9]+/)[0]);

    cy.get('.rating-count').then(($counts) => {
      const initialCounts = [...$counts];
      const sortedCounts = [...$counts];
      sortedCounts.sort((a, b) => extractCount(b) - extractCount(a));
      expect(sortedCounts).to.deep.equal(initialCounts);
    });

    cy.get('[value="asc"]').click();

    cy.get('.rating-count').then(($counts) => {
      const initialCounts = [...$counts];
      const sortedCounts = [...$counts];
      sortedCounts.sort((a, b) => extractCount(a) - extractCount(b));
      expect(sortedCounts).to.deep.equal(initialCounts);
    });
  });

  it('links correctly to PlaceDetail', () => {
    cy.get('.place-detail-link').first().as('place');
    cy.get('@place').then(($link) => {
      const placeName = $link.text();
      cy.get('@place').click();
      cy.contains(`More information about ${placeName}`);
    });
  });
});
