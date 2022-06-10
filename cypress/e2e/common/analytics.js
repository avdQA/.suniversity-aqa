import { Then } from "cypress-cucumber-preprocessor/steps";

Then("user should see the {string} name in the modal form {string}", (itemType, modalFormName) => {
  const { activeSection, data } = Cypress.env("activePage");
  const modalView = activeSection.getModalView(modalFormName);
  cy.get(modalView.mainContainer).contains(data.targetItemName).should("be.visible");
});

Then("user should see the number of comments to the file in the modal form {string}", (modalFormName) => {
  const { activeSection, data } = Cypress.env("activePage");
  const modalView = activeSection.getModalView(modalFormName);
  modalView.getQuantity("Comments").invoke("text").should("to.include", data.numberOfComments);
});

Then("user should see the {int} number of downloads to the item in the modal form {string}", (numberOfDownloads, modalFormName) => {
  const { activeSection } = Cypress.env("activePage");
  const modalView = activeSection.getModalView(modalFormName);
  modalView
    .getQuantity("downloaded")
    .invoke("text")
    .should("to.eq", numberOfDownloads + "");
});

Then("user should see the {int} number of files containing the folder in the modal form {string}", (numberOfFiles, modalFormName) => {
  const { activeSection } = Cypress.env("activePage");
  const modalView = activeSection.getModalView(modalFormName);
  modalView
    .getQuantity("files")
    .invoke("text")
    .should("to.eq", numberOfFiles + "");
});
