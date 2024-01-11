/// <reference types='Cypress' />

const informationForm = require('../fixtures/information-form.json');

export function checkRoomInformationApproachOne() {
  cy.get('.hotel-room-info')
    .first()
    .should('exist')
    .and('be.visible')
    .within(() => {
      cy.get('h3').should('exist').and('be.visible').and('have.text', 'single');

      // Print handicap accessible
      let wheelchairAccessible = cy.get('.wheelchair');

      !wheelchairAccessible
        ? cy.log('Not an accessible room')
        : cy.log('Room is accessible');

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
}

export function checkRoomInformationApproachTwo() {
  cy.get('.hotel-room-info').then(($availableRooms) => {
    const roomCount = $availableRooms.length;
    let wheelchairAccessible = cy.get('.wheelchair');

    for (let i = 0; i < roomCount; i++) {
      cy.get(`:nth-child(${i + 1}) .hotel-room-info`).within(() => {
        cy.get('h3').then(($room) => {
          // Print room type
          let roomType = $room.text();
          cy.log(roomType);

          // Print handicap accessible
          !wheelchairAccessible
            ? cy.log('Not an accessible room')
            : cy.log('Room is accessible');

          // Print room information
          cy.get('p')
            .should('exist')
            .and('be.visible')
            .then(($description) => {
              let roomInformation = $description.text();
              cy.log(roomInformation);
            });

          // Print amenities
          cy.get('ul')
            .should('exist')
            .and('be.visible')
            .then(($list) => {
              let listLength = $list.children().length;

              for (let x = 0; x < listLength; x++) {
                cy.get(`ul > :nth-child(${x + 1})`)
                  .should('exist')
                  .and('be.visible')
                  .then(($amenity) => {
                    let listItem = $amenity.text();
                    cy.log(listItem);
                  });
              }
            });
        });
      });
    }
  });
}

export function openCalendar() {
  cy.intercept('GET', 'https://automationintesting.online/report/room/1').as(
    'openCalendar'
  );
  cy.get('.openBooking')
    .should('exist')
    .and('be.visible')
    .first()
    .scrollIntoView()
    .click();
  cy.wait('@openCalendar');
}

export function selectDates() {
  cy.get('.rbc-date-cell:not(".rbc-off-range")')
    .eq(1)
    .drag('.rbc-date-cell:not(".rbc-off-range"):nth(15)');
}

export function completeInformationForm() {
  informationForm.forEach((input) => {
    cy.get(input.input)
      .should('exist')
      .and('be.visible')
      .then(($field) => {
        cy.get($field).type(input.text);
      });
  });
}

export function bookTrip() {
  cy.get('button')
    .contains('Book')
    .should('exist')
    .and('be.visible')
    .click()
    .then(() => {
      cy.get('.confirmation-modal')
        .should('exist')
        .and('be.visible')
        .within(() => {
          // Check contents
          cy.get('h3')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Booking Successful!');

          // Check dates
          cy.get('p')
            .should('exist')
            .and('be.visible')
            .and(
              'contain.text',
              'Congratulations! Your booking has been confirmed for:'
            );

          cy.get('.btn-outline-primary')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Close')
            .click();
        });
    });
}
