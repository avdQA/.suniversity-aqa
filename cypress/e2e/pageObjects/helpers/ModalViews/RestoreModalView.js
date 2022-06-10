class RestoreModalView {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  selectors = {
    main_container: "section.modal.modal__contented",
  };

  buttons = {
    close: "xxxx",
    cancel: "xxxx",
    restore: "button.accept",
  };

  clickButton(name) {
    if (cy.nameToProp(name) === "restore") this.submitForm();
    else cy.get(this.mainContainer).find(this.buttons[cy.nameToProp(name)]).click({ force: true });
  }

  submitForm() {
    cy.intercept("PUT", "/api/trash/multiply/restore").as("confirmRestore");
    cy.get(this.mainContainer).find(this.buttons.restore).click({ force: true });
    return cy.wait("@confirmRestore");
  }
}
export default RestoreModalView;
