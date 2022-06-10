class DeletePermanently {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  selectors = {
    main_container: "section.modal.modal__contented",
  };

  buttons = {
    close: "xxxx",
    cancel: "xxxx",
    delete: "button.accept",
  };

  clickButton(name) {
    name = cy.nameToProp(name);
    if (name === "delete") this.submitForm();
    else cy.get(this.mainContainer).find(this.buttons[name]).click({ force: true });
  }

  submitForm() {
    cy.intercept("PUT", "/api/trash/multiply").as("confirmForm");
    cy.get(this.mainContainer).find(this.buttons.delete).click({ force: true });
    return cy.wait("@confirmForm");
  }
}
export default DeletePermanently;
