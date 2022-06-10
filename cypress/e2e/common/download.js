import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("user selects this item and downloads it using Topbar", () => {
  const { activeSection, data } = Cypress.env("activePage");
  activeSection.checkTargetItem(data.targetItemName, data.targetItemSlug, data.targetFileExtension);
  activeSection.topbarMenu.clickButton("Download");
});

Then("check that the response code of the downloaded item request equal {int}", (rCode) => {
  cy.get("@downloadItem").its("response.statusCode").should("to.eql", rCode);
});

Then("check the downloaded {string} name and extension for compliance", (itemType) => {
  itemType = cy.nameToProp(itemType);
  const { data } = Cypress.env("activePage");

  const fileName = () => {
    if (itemType === "folder") return "download-";
    if (itemType === "file") return data.targetItemName;
    if (itemType === "note_as_pdf") return data.targetNoteTitle;
    if (itemType === "note_as_docx") return data.targetNoteTitle;
  };
  const fileExtension = () => {
    if (itemType === "folder") return "zip";
    if (itemType === "file") return data.targetFileExtension;
    if (itemType === "note_as_pdf") return "pdf";
    if (itemType === "note_as_docx") return "docx";
  };

  cy.verifyDownload(fileName(), { contains: true });
  cy.verifyDownload(fileExtension(), { contains: true });
});
