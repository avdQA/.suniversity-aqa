import { Given, When } from "cypress-cucumber-preprocessor/steps";

When("user select the existing file", () => {
  const { data } = Cypress.env("activePage");
  cy.get(`section[data-test*='${data.targetItemSlug}']`).scrollIntoView().click({ force: true });
});

Given("any available file at the root", () => {
  const { data } = Cypress.env("activePage");
  cy.uploadFile("small", "svg").then((uploadFile) => {
    if (uploadFile.response.statusCode === 201) {
      data.targetItemSlug = uploadFile.response.body.data.slug;
      data.targetItemName = uploadFile.response.body.data.name;
      data.targetFileExtension = uploadFile.response.body.data.extension.slice(1);
      cy.log(`_> FILE: [${data.targetItemName}] ~ created is Successful`);
    } else expect(uploadFile.response.statusCode, "[Check response status code is 201]").to.eq(201);
  });
});

Given("the available {string} {string} file in the root folder", (fileName, fileExtension) => {
  const { data } = Cypress.env("activePage");
  cy.uploadFile(cy.nameToProp(fileName), cy.nameToProp(fileExtension)).then((uploadFile) => {
    if (uploadFile.response.statusCode === 201) {
      data.targetItemSlug = uploadFile.response.body.data.slug;
      data.targetItemName = uploadFile.response.body.data.name;
      data.targetFileExtension = uploadFile.response.body.data.extension.slice(1);
      cy.log(`_> FILE: [${data.targetItemName}] ~ created is Successful`);
    } else expect(uploadFile.response.statusCode, "[Check response status code is 201]").to.eq(201);
  });
});

Given("available {string} {string} file with {int} comment at the active folder", (fileName, fileExtension, numberOfComments) => {
  const { data } = Cypress.env("activePage");

  cy.uploadFile(cy.nameToProp(fileName), cy.nameToProp(fileExtension)).then((uploadFile) => {
    if (uploadFile.response.statusCode === 201) {
      data.targetItemSlug = uploadFile.response.body.data.slug;
      data.targetItemName = uploadFile.response.body.data.name;
      data.targetFileExtension = uploadFile.response.body.data.extension.slice(1);
      cy.log(`_> FILE: [${data.targetItemName}] ~ created is Successful`);
      for (let index = 0; index < numberOfComments; index++) {
        cy.setCommentToItem(uploadFile.response.body.data.slug);
      }
    } else expect(uploadFile.response.statusCode, "[Check response status code is 201]").to.eq(201);
  });

  cy.get("@setComment").then((setComment) => {
    expect(setComment.status, "[Check response status code is 201]").to.eq(201);
    data.numberOfComments = numberOfComments;
    cy.reload();
    cy.wait("@workspaces");
  });
});
