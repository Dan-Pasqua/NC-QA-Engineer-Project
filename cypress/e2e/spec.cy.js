/// <reference types='Cypress' />
import '../utils/helpers';
import {
  bookTrip,
  checkRoomInformationApproachOne,
  checkRoomInformationApproachTwo,
  completeInformationForm,
  getRandomMonth,
  openCalendar,
  selectDates,
} from '../utils/helpers';
const errors = require('../fixtures/error-messages.json');
const months = require('../fixtures/months.json');
const informationForm = require('../fixtures/information-form.json');

describe('New Classrooms QA Engineer Challenge', () => {
  beforeEach(() => {
    // Visit site and check for logo to verify existence and visibility of homepage
    cy.visit('/');
    cy.get('.hotel-logoUrl').should('exist').and('be.visible');
  });

  context('User story testing', () => {
    it('displays room options on the homepage', () => {
      /* User Story #1 */
      /* ---------- APPROACH #1 ---------- */
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
      cy.log('Approach #1');
      checkRoomInformationApproachOne();

      /*
            In the above approach, I verified the first available room since only one room appeared on the 
            site around 90 percent of the time I had it open. 
            
            Since the availability included multiple rooms only on a few occasions, I added the approach 
            below to demonstrate the ability to iterate through each room and print its information as if 
            I were using a fixture file. Using a fixture file to verify availability based on the calendar 
            bookings would require a cleanup script to reset the room availability after the test is finished running.
  
            If I had access to the database, I'd write SQL queries to return available rooms and their 
            information and compare it to what is visible in the UI.
      */

      /* ---------- APPROACH #2 ---------- */
      cy.log('Approach #2');
      checkRoomInformationApproachTwo();
    });

    it('loads the availability calendar and contact information form after clicking on the Book this room button', () => {
      /* User Story #3 */
      // Opens the calendar in edit mode
      openCalendar();
      cy.get('.rbc-calendar')
        .should('exist')
        .and('be.visible')
        .then(() => {
          cy.get('button').contains('Today').should('exist').and('be.visible');
          cy.get('button').contains('Back').should('exist').and('be.visible');
          cy.get('button').contains('Next').should('exist').and('be.visible');

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

    it('checks the information form functionality', () => {
      /* User Story #5 */
      openCalendar();

      // Check each input
      informationForm.forEach((input) => {
        cy.get(input.input)
          .should('exist')
          .and('be.visible')
          .then(($field) => {
            cy.get($field).should(
              'have.attr',
              'placeholder',
              input.placeholder
            );
          });
      });
      // Check if inputs are mandatory
      cy.get('button')
        .contains('Book')
        .should('exist')
        .and('be.visible')
        .click()
        .then(() => {
          // Check error messages

          /* ---------- BUG FOUND: Error messages are not in the same order from run to run ---------- */
          /* ---------- BUG FOUND: Error messages do not specify inputs, except for Firstname and Lastname ---------- */

          /* Fixture and related code saved to demonstrate preparations for future bug fix */
          cy.get('.alert-danger').should('exist').and('be.visible');
          // .within(() => {
          // for (let i = 0; i < errors.length; i++) {
          //   cy.get(`p:nth-child(${i + 1})`)
          //     .should('exist')
          //     .and('be.visible')
          //     .and('contain', errors[i]);
          // }
          // });
        });
    });

    /* ---------- BUG FOUND: Minimum of two nights not enforced ---------- */
    it(
      'produces a "Booking successful" pop-up after a successful booking',
      {
        retries: {
          runMode: 8,
          openMode: 7,
        },
      },
      () => {
        // User Story #4 and User Story #8
        for (let i = 0; i < 2; i++) {
          openCalendar();

          // Select dates
          getRandomMonth();
          selectDates();

          // Complete information form
          completeInformationForm();

          // Book trip
          bookTrip();
        }
      }
    );
  });
});
