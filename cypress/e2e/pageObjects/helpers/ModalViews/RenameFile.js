class RenameFile {
  title = "Rename file";

  buttons = {
    close: "[data-test=create-entity-modal_close_button]",
    cancel: "[data-test=create-entity-modal_cancel_button]",
    rename: "[data-test=create-entity-modal_accept_button]",
  };

  fields = {
    file_name: "[data-test=create-entity-modal_input_field]",
  };

  getButton(name) {
    return this.buttons[cy.nameToProp(name)];
  }

  getField(name) {
    return this.fields[cy.nameToProp(name)];
  }

  submitForm(slug) {
    cy.log(slug);
    cy.intercept("PUT", `/api/files/${slug}`).as("renameFile");
    cy.get(this.buttons.rename).click({ force: true });
    return cy.wait("@renameFile");
  }
}
export default RenameFile;
