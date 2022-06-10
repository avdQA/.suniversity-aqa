import { Then, Given } from "cypress-cucumber-preprocessor/steps";

Then("Comment successfully added", () => {
  const page = Cypress.env("activePage");

  cy.get("@postComment").its("request.body").should("to.include", { text: page.data.comment_text });
  cy.get("@postComment").its("response.statusCode").should("to.eql", 201);
});

Then("entered comment displayed in right sidebar", () => {
  const page = Cypress.env("activePage");
  const commentTab = page.activeSection.rightSidebar.getTab("comments");
  commentTab.getCommentText().contains(page.data.comment_text).should("be.visible");
});

Given("user must be inside an existing folder", () => {
  const { data } = Cypress.env("activePage");

  cy.createFolderIPFS()
    .then((createFolderIPFS) => {
      if (createFolderIPFS.status === 201) {
        data.targetParentName = createFolderIPFS.body.data.name;
        data.targetParentSlug = createFolderIPFS.body.data.slug;
        cy.log(`_> FOLDER: [${createFolderIPFS.body.data.name}] ~ created is Successful`);
      } else expect(createFolderIPFS.status, "[Check response status code is 201]").to.eq(201);
    })
    .then(() => {
      const targetFolderSelector = `[data-test*='${data.targetParentSlug}']`;
      cy.get(targetFolderSelector).dblclick({ force: true });
    });
});
