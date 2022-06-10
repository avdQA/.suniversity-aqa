import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

beforeEach(() => {
  cy.log(`[ActivePage set null] >_ is done.`);
  Cypress.env("activePage", null);
});

afterEach(() => {
  if (Cypress.env("activePage")) {
    const { data = {} } = Cypress.env("activePage");
    cy.deleteItemFinally(data.targetItemSlug, data.targetParentSlug, data.folder_slug, data.parent_folder_slug);
  }
});

And("clear PageData", () => {
  Cypress.env("activePage", null);
});

And("clear uploads folder", () => {
  cy.deleteDownloadsFolder("cypress/fixtures/downloads");
});

And("clear downloads folder", () => {
  cy.deleteDownloadsFolder();
});

Given("Chrome browser with MetaMask plugin", () => {
  const pluginPage = new ChromeWebStoreMetaMask();
  pluginPage.visit();
  pluginPage.addPlugin();
});

Then("I should see the {string} path in the browser's address bar", (path) => {
  cy.url().should("include", path);
});

Then("I should see the {string} text on the active page", (text) => {
  cy.contains(text).should("be.visible");
});

Then("In the title I see the text {string}", (text) => {
  cy.title().should("to.eql", text);
});

When("user clicks {string} in the context menu of the target {string}", (itemName, contextmenuName) => {
  const page = Cypress.env("activePage");
  const contextMenu = page.activeSection.getContext(contextmenuName);

  cy.get(page.activeSection.mainContainer).find(`[data-test*='${page.data.targetItemSlug}']`).scrollIntoView().rightclick({ force: true });
  if (itemName == "Restore") cy.intercept("PUT", "/api/trash/multiply/restore").as("confirmRestore");
  contextMenu.selectItem(itemName);
});

When("user clicks on target item", () => {
  const { activeSection, data } = Cypress.env("activePage");
  cy.get(activeSection.mainContainer).find(`section[data-test*='${data.targetItemSlug}']`).scrollIntoView().click({ force: true });
});
