import { When } from "cypress-cucumber-preprocessor/steps";

When("user presses the [{string}] button in the top panel menu", (buttonName) => {
  const { activeSection } = Cypress.env("activePage");
  buttonName = cy.nameToProp(buttonName);
  if (buttonName === "upload") {
    activeSection.topbarMenu.clickButton(buttonName);
    cy.get("@uploadItem").its("response.statusCode").should("to.eql", 200);
  } else activeSection.topbarMenu.clickButton(buttonName);
});

When("user selects this {string} and deletes it permanently using Topbar", (itemType) => {
  const { activeSection, data } = Cypress.env("activePage");
  const deleteModalView = activeSection.getModalView("Delete permanently");

  activeSection.checkTargetItem(data.targetItemName, data.targetItemSlug, data.targetFileExtension);
  activeSection.topbarMenu.clickButton("Delete");
  deleteModalView.clickButton("Delete");
});

When("user click on {string} item in {string} submenu of topbar menu", (itemName, submenuName) => {
  const page = Cypress.env("activePage");
  const subMenu = page.activeSection.topbarMenu.getSubmenu(submenuName);
  subMenu.selectItem(itemName);
});
