import { Then } from "cypress-cucumber-preprocessor/steps";

Then("this {string} has been restored", (itemType) => {
  const { data } = Cypress.env("activePage");
  cy.wait("@confirmRestore").its("response.statusCode").should("to.eql", 200);
  cy.get("@confirmRestore")
    .its("response.body.data")
    .then((rData) => {
      cy.wrap(rData[0]).should("to.include", { slug: `${data.targetItemSlug}` });
    });
});

Then("this {string} does not displayed in the Deleted section", (itemType) => {
  const { activeSection, data } = Cypress.env("activePage");
  activeSection.getMainContainer().should("not.to.contain", data.targetItemName);
});

Then("this {string} is displayed in the Drive section", () => {
  const { activeSection, data, sideMenu } = Cypress.env("activePage");
  sideMenu.selectItem("files");
  cy.get(activeSection.mainContainer).contains(data.targetItemName).should("to.be.exist");
});
