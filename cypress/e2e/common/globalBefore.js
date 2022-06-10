import { Given } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../pageObjects/HomePage";
import MainPage from "../pageObjects/MainPage";

Given("User should be on the Home web page", () => {
  const page = new HomePage();
  page.visit();

  Cypress.env("activePage", page);
});

Given("User should be on the Main web page and signed as owner", () => {
  const page = new MainPage();
  cy.getActiveUser().then((user) => {
    page.user = user;
    cy.setTokenToLocalStorage(page.user.token);
  });

  cy.intercept("/api/me").as("me");
  cy.intercept("/api/user/workspaces").as("workspaces");
  page.visit();

  cy.wait("@workspaces").then(() => {
    Cypress.env("activePage", page);
  });
});

Given(/^User should be on the Main web page and signed as "(.*)"$/, (userName) => {
  const page = new MainPage();
  cy.getActiveUser(userName).then((user) => {
    page.user = user;
    cy.setTokenToLocalStorage(page.user.token);
  });

  cy.intercept("/api/me").as("me");
  cy.intercept("/api/user/workspaces").as("workspaces");
  page.visit();

  cy.wait("@workspaces").then(() => {
    Cypress.env("activePage", page);
  });
});

Given(/^User must be in "(.*)" storage$/, (targetStorageType) => {
  const activePage = Cypress.env("activePage");

  const targetStorageToken = activePage.user[`${cy.nameToProp(targetStorageType)}-token`];
  cy.setTokenToLocalStorage(targetStorageToken);

  cy.intercept("/api/me").as("me");
  cy.intercept("/api/user/workspaces").as("workspaces");
  activePage.visit();

  cy.wait("@workspaces");
});
