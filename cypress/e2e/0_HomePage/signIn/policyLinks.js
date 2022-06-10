import { When } from "cypress-cucumber-preprocessor/steps";

When("I click on {string} link", (privacyLinkName) => {
  const { termAndConditions } = Cypress.env("activePage");
  termAndConditions.getPrivacyLink(privacyLinkName).invoke("removeAttr", "target").click({ force: true });
});
