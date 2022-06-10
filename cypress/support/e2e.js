// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "./utils";
import "@shelex/cypress-allure-plugin";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// ***********************************************************

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

((stage) => {
  Cypress.config("stage", Cypress.env(stage));
  Cypress.config("baseUrl", Cypress.config("stage").host);
})(Cypress.env("STAGE"));
