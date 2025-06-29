// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress" />


// Example of a custom command to log in via API
// Cypress.Commands.add('loginByApi', () => {
//   cy.request({
//     method: 'POST',
//     url: '/api/auth/login',
//     body: {
//       username: 'admin',
//       password: 'admin123'
//     },
//   }).then((resp) => {
//     // Set token or cookie
//     window.localStorage.setItem('authToken', resp.body.token); // Adjust based on app
//   });
// });