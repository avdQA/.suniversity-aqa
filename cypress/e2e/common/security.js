import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("the existing main folder with security PIN", () => {
  const { data } = Cypress.env("activePage");

  cy.createFolderIPFS().then((createFolderIPFS) => {
    expect(createFolderIPFS.status, "[Check response status code is 201]").to.eq(201);
    cy.log(`_> FOLDER: [${createFolderIPFS.body.data.name}] ~ created is Successful`);
    if (createFolderIPFS.status === 201) {
      data.targetItemName = createFolderIPFS.body.data.name;
      data.targetItemSlug = createFolderIPFS.body.data.slug;
      cy.setSecurityPIN(createFolderIPFS.body.data.slug).then((setSecurityPIN) => {
        expect(setSecurityPIN.status, "[Check response status code is 200]").to.eq(200);
        cy.reload();
        cy.wait("@workspaces");
      });
    }
  });
});

Given("the available {string} {string} file at the root with security PIN", (fileName, fileExtension) => {
  const { data } = Cypress.env("activePage");

  cy.uploadFile(cy.nameToProp(fileName), cy.nameToProp(fileExtension)).then((uploadFile) => {
    if (uploadFile.response.statusCode === 201) {
      data.targetItemSlug = uploadFile.response.body.data.slug;
      data.targetItemName = uploadFile.response.body.data.name;
      data.targetFileExtension = uploadFile.response.body.data.extension.slice(1);
      cy.log(`_> FILE: [${data.targetItemName}] ~ created is Successful`);
      cy.setSecurityPIN(uploadFile.response.body.data.slug).then((setSecurityPIN) => {
        expect(setSecurityPIN.status, "[Check response status code is 200]").to.eq(200);
        cy.reload();
        cy.wait("@workspaces");
      });
    } else expect(uploadFile.response.statusCode, "[Check response status code is 201]").to.eq(201);
  });
});

When("user enters a valid PIN and confirms it", () => {
  const { securityPINSidebar, data } = Cypress.env("activePage");
  securityPINSidebar.enterValidPIN(data.targetItemSlug);
});

When("user will turn {string} the PIN switch on the {string} tab of the right sidebar", (typeAction, tabName) => {
  const { activeSection, data } = Cypress.env("activePage");
  const securityTab = activeSection.rightSidebar.selectTab(tabName);
  if (typeAction === "on") securityTab.checkPINToggle(data.targetItemSlug);
  if (typeAction === "off") securityTab.uncheckPINToggle(data.targetItemSlug);
});

Then("the PIN successfully added", () => {
  const page = Cypress.env("activePage");
  const securityTab = page.activeSection.rightSidebar.getTab("security");

  cy.get("@checkPINToggle").its("response.statusCode").should("to.eql", 200);
  securityTab.getToggle("pin").should("to.have.css", "background-color", "rgb(32, 106, 207)");
});

Then("the PIN successfully removed", () => {
  const page = Cypress.env("activePage");
  const securityTab = page.activeSection.rightSidebar.getTab("security");

  cy.get("@uncheckPINToggle").its("response.statusCode").should("to.eql", 200);
  securityTab.getToggle("pin").should("to.have.css", "background-color", "rgb(214, 216, 225)");
});
