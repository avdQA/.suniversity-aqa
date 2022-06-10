import { Given, When } from "cypress-cucumber-preprocessor/steps";

When("user click on workspace logo", () => {
  const page = Cypress.env("activePage");
  page.sideMenu.getWorkspaceMenu().click({ force: true });
});

When("user click on New workspace", () => {
  const page = Cypress.env("activePage");
  page.sideMenu.getNewWorkspace().last().click({ force: true });
});

Given("user must be in the {string} section", (sectionName) => {
  const page = Cypress.env("activePage");
  page.sideMenu.selectItem(sectionName);
  page.activeSection = page.getSection(sectionName);
  cy.log(`[ActivePage] >_ ${sectionName} ~ is SET`);
});

Given("user must be in the {string} section with printing stub", (sectionName) => {
  const page = Cypress.env("activePage");
  page.sideMenu.selectItemWithStub(sectionName);
  page.activeSection = page.getSection(sectionName);
  cy.log(`[ActivePage] >_ ${sectionName} ~ is SET`);
});
