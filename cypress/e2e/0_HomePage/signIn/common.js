import { Before } from "cypress-cucumber-preprocessor/steps";
import SignInCrypto from "../../pageObjects/SignInCryptoPage";

Before({ tags: "@homePage" }, () => {
  cy.log(`[Before Sign IN ????????] >_`);
  Cypress.env("activePage", new SignInCrypto());
});
