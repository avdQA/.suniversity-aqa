import { Given } from "cypress-cucumber-preprocessor/steps";

Given("User should be on the SignInCrypto web page", () => {
  const signInPage = new Cypress.env("activePage");
  signInPage.visit();
});
