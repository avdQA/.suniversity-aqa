class SecurityPINSidebar {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  selectors = {
    main_container: "div.file-security-modal",
    buttons: {
      backspace: ".password-popup__remove-char-icon > svg",
      close: ".modal__exit",
      confirm: ".password-popup__btn",
    },
  };

  getSelector(name) {
    return this.selectors[cy.nameToProp(name)];
  }

  enterValidPIN(targetSlug) {
    cy.intercept("GET", `/api/files/${targetSlug}?*`).as("enterValidPIN");
    cy.intercept("POST", `/api/user/security/token?*`).as("enterValidPIN");
    cy.get(".password-popup__numbers > :nth-child(1) > :nth-child(1)").click({ force: true });
    cy.get(".password-popup__numbers > :nth-child(1) > :nth-child(2)").click({ force: true });
    cy.get(".password-popup__numbers > :nth-child(1) > :nth-child(3)").click({ force: true });
    cy.get(".password-popup__numbers > :nth-child(2) > :nth-child(1)").click({ force: true });
    cy.get(this.mainContainer).find(this.selectors.buttons.confirm).click({ force: true });
    return cy.wait("@enterValidPIN");
  }
}
export default SecurityPINSidebar;
