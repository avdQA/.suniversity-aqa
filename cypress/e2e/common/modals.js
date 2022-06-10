import { Then, When } from "cypress-cucumber-preprocessor/steps";

When("user click on [{string}] button in modal form {string}", (buttonName, modalFormName) => {
  const { activeSection } = Cypress.env("activePage");
  const modalView = activeSection.getModalView(modalFormName);

  modalView.clickButton(buttonName);
});

When("user submits modal form {string}", (modalName) => {
  const { activeSection, data } = Cypress.env("activePage");
  const modalView = activeSection.getModalView(modalName);
  modalView.submitForm(data.targetItemSlug);
});

Then("this {string} has been permanently deleted", (itemType) => {
  cy.get("@confirmForm").its("response.statusCode").should("to.eql", 200);
  cy.get("@confirmForm").its("response.body").should("to.include", { message: "success" });
});

When("user type any valid name to the {string} field in {string} modal view", (fieldTitle, modalName) => {
  const { activeSection, data } = Cypress.env("activePage");
  const fakeName = cy.getFakeText(fieldTitle);
  const modalView = activeSection.getModalView(modalName);
  cy.get(modalView.getField(fieldTitle)).type(fakeName).invoke("val").should("to.equal", fakeName);
  data.targetItemName = fakeName;
});

When("clear and type any valid name in the {string} field of modal form {string}", (fieldTitle, modalName) => {
  const { activeSection, data } = Cypress.env("activePage");
  const modalView = activeSection.getModalView(modalName);
  const fakeName = cy.getFakeText(fieldTitle, data.targetFileExtension);

  cy.get(modalView.getField(fieldTitle)).clear().type(fakeName).invoke("val").should("to.equal", fakeName);
  data.newTargetItemName = fakeName;
});
