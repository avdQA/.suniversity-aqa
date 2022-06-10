class RenameFolderModalView {
  constructor() {
    this.mainContainer = "section.modal.modal__contented";
  }

  title = "Rename folder";

  buttons = {
    close: "[data-test=create-entity-modal_close_button]",
    cancel: "[data-test=create-entity-modal_cancel_button]",
    rename: "[data-test=create-entity-modal_accept_button]",
  };

  fields = {
    folder_name: "[data-test=create-entity-modal_input_field]",
  };

  clickButton(name) {
    name = cy.nameToProp(name);
    if (name === "rename") this.submitForm();
    else cy.get(this.mainContainer).find(this.buttons[name]).click({ force: true });
  }

  getField(name) {
    return this.fields[cy.nameToProp(name)];
  }

  submitForm(slug) {
    cy.intercept("PUT", `/api/folders/${slug}`).as("renameFolder");
    cy.get(this.mainContainer).find(this.buttons.rename).click({ force: true });
    return cy.wait("@renameFolder");
  }
}
export default RenameFolderModalView;
