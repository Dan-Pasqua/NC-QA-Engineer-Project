/// <reference types='Cypress' />
describe('Restful Booker Platform Demo', () => {
  beforeEach(() => {
    // Visit site and check for logo
    cy.visit('/');
    cy.get('.hotel-logoUrl').should('exist').and('be.visible');
  });

  it('should display room options on the homepage', () => {
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

    // Get number of available rooms
    const availableRooms = cy.get('.hotel-room-info h3').length;
    cy.log(availableRooms);

    // // Log each header
    // availableRooms.forEach(($room) => {
    //   let roomHeader = $room.textContent;
    //   cy.log(roomHeader);

    //   cy.get($room).within(() => {
    //     cy.get('li').children();
    //   });
    //});
  });
});

describe.only('Booking', () => {
  beforeEach(() => {
    // Visit site and check for logo
    cy.visit('/');
    cy.get('.hotel-logoUrl').should('exist').and('be.visible');
    cy.get('.room-header').scrollIntoView();
  });

  it('loads the availability calendar and contact information form after clicking on the Book this room button', () => {
    // Click on the Book this room button to open the calendar in edit mode
    cy.get('.openBooking').should('have.text', 'Book this room').click();
    cy.get('.rbc-calendar').should('exist').and('be.visible');

    cy.get('.btn .confirmation-modal').within(() => {
      cy.get('h3').should('have.text', 'Booking Successful!');

      cy.get('p:first').should(
        'have.text',
        'Congratulations! Your booking has been confirmed for:'
      );
    });
  });
});
