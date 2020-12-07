/// <reference types="Cypress" />

let auth0LoginBtn =
  '#nav-right-items > ul > button.login-button.no-session.btn.btn-outline-secondary';

describe('Travel0 App', () => {
  it('successfully loads', () => {
    cy.visit('https://morbo.travel0.net/');
  });

  it('does not have Auth0 login enabled', () => {
    cy.get('#nav-right-items > ul > a:nth-child(1) > button').click();
    cy.url().should('include', 'travel0.net/login');
  });

  it('enable Auth0 login', () => {
    cy.visit('https://morbo.travel0.net/');
    cy.get('#app > div > button').click();
    cy.get('#app > div > div:nth-child(1) > div.sideBar > div.d-flex-1 > div:nth-child(2)').click();
    cy.pause();
    cy.get(':nth-child(2) > .col-2 > .switch > .slider').click();
    
  })
});
