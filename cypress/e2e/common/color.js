import { When } from "cypress-cucumber-preprocessor/steps";

When("user selects the color {string} in the right sidebar", (colorName) => {
  const { activeSection } = Cypress.env("activePage");
  const activeTab = activeSection.rightSidebar.selectTab("Main");
  const colors = activeTab.getPart("Colors");

  colors.selectColor(colorName);
});
