class SecurityTab {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  selectors = {
    main_container: "div.entity-settings__content section",
    toggles: {
      pin: ":nth-child(2) > .security-option-switcher-item-switch > .switch > .slider",
    },
  };

  getSelector(name) {
    return this.selectors[cy.nameToProp(name)];
  }

  getToggle(name) {
    return cy.get(this.mainContainer).find(this.selectors.toggles[cy.nameToProp(name)]);
  }

  checkPINToggle(targetItemSlug) {
    cy.intercept("POST", `/api/files/${targetItemSlug}/securities/2`).as("checkPINToggle");
    cy.get(this.mainContainer).find(this.selectors.toggles.pin).click({ force: true });
    return cy.wait("@checkPINToggle");
  }

  uncheckPINToggle(targetItemSlug) {
    const { securityPINSidebar } = Cypress.env("activePage");

    cy.intercept("DELETE", `/api/files/${targetItemSlug}/securities/2?**`).as("uncheckPINToggle");
    cy.get(this.mainContainer).find(this.selectors.toggles.pin).click({ force: true });
    securityPINSidebar.enterValidPIN();
    return cy.wait("@uncheckPINToggle");
  }
}
export default SecurityTab;
