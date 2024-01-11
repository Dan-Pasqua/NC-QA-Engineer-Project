/// <reference types='Cypress' />

const informationForm = require('../fixtures/information-form.json');

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
