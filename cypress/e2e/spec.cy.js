/// <reference types='Cypress' />
import '../utils/helpers';
import { openCalendar } from '../utils/helpers';
const months = require('../fixtures/months.json');

describe.only('Restful Booker Platform Demo', () => {
  beforeEach(() => {
    // Visit site and check for logo to verify existence and visibility of homepage
    cy.visit('/');
    cy.get('.hotel-logoUrl').should('exist').and('be.visible');
  });

  it('displays room options on the homepage', () => {
    /* User Story #1 */
    // Check for Rooms header
    cy.get('.room-header')
      .scrollIntoView()
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Rooms');

    // Check for room information section
    cy.get('.hotel-room-info')
      .scrollIntoView()
      .should('exist')
      .and('be.visible');

    // Check room information
    cy.get('.hotel-room-info')
      .first()
      .should('exist')
      .and('be.visible')
      .within(() => {
        cy.get('h3')
          .should('exist')
          .and('be.visible')
          .and('have.text', 'single');

        cy.get('p')
          .should('exist')
          .and('be.visible')
          .and(
            'have.text',
            'Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.'
          );

        // Check room amenities
        const amenities = ['TV', 'WiFi', 'Safe'];

        for (let i = 0; i < amenities.length; i++) {
          cy.get(`ul > :nth-child(${i + 1})`)
            .should('exist')
            .and('be.visible')
            .and('have.text', amenities[i]);
        }
      });
  });

  it('loads the availability calendar and contact information form after clicking on the Book this room button', () => {
    /* User Story #2 */
    // Opens the calendar in edit mode
    openCalendar();
    cy.get('.rbc-calendar')
      .should('exist')
      .and('be.visible')
      .then(() => {
        var date = new Date();
        let bookingDate =
          months[date.getMonth() + 1] + ' ' + date.getFullYear();

        // Calendar defaults to the following month
        cy.get('.rbc-toolbar-label')
          .should('exist')
          .and('be.visible')
          .then((uiDate) => {
            let uiBookingDate = uiDate.text();

            if (months[date.getMonth()] === 'December') {
              bookingDate = 'January ' + [date.getFullYear() + 1];
            }

            /* ----------> BUG FOUND: Calendar defaults to current month <---------- */
            if (uiBookingDate !== bookingDate) {
              cy.log(
                `BUG -- Incorrect default month: ${uiBookingDate}, ${bookingDate}`
              );
            }
          });

        // Contact information form opens in edit mode
        cy.get('.hotel-room-info .col-sm-4')
          .first()
          .should('exist')
          .and('be.visible')
          .within(() => {
            const fieldNames = ['Firstname', 'Lastname', 'Email', 'Phone'];

            for (let i = 0; i < fieldNames.length; i++) {
              cy.get(`:nth-child(${i + 1}) > .form-control`)
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'placeholder', fieldNames[i]);
            }
          });
      });
  });
});
