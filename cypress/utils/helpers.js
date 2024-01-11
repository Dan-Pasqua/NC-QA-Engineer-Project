/// <reference types='Cypress' />

export function openCalendar() {
  cy.intercept('GET', 'https://automationintesting.online/report/room/1').as(
    'openCalendar'
  );
  cy.get('.openBooking')
    .scrollIntoView()
    .should('exist')
    .and('be.visible')
    .first()
    .click();
  cy.wait('@openCalendar');
}
