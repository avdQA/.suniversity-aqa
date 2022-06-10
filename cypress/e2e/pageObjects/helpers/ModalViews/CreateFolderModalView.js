class CreateFolderModalView {
  constructor() {
    this.mainContainer = "section.modal.modal__contented";
  }

  title = "Create folder";

  buttons = {
    close: "[data-test=create-entity-modal_close_button]",
    cancel: "[data-test=create-entity-modal_cancel_button]",
    create: "[data-test=create-entity-modal_accept_button]",
  };

  fields = {
    folder_name: "[data-test=create-entity-modal_input_field]",
  };

  clickButton(name) {
    name = cy.nameToProp(name);
    if (name === "create") this.submitForm();
    else cy.get(this.mainContainer).find(this.buttons[name]).click({ force: true });
  }

  getField(name) {
    return this.fields[cy.nameToProp(name)];
  }

  submitForm() {
    cy.intercept("POST", "/api/folders/folder").as("createFolder");
    cy.get(this.mainContainer).find(this.buttons.create).click({ force: true });
    return cy.wait("@createFolder");
  }
}
export default CreateFolderModalView;
