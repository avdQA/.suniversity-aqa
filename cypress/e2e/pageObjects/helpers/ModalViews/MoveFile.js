class MoveFile {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  title = "Move file";

  selectors = {
    main_container: "section.modal.modal-extended",
    files_container: "div.move-right",
  };

  buttons = {
    close: "button.modal__exit",
    move_to_this_folder: "button.move",
  };

  fields = {
    file_name: "[data-test=create-entity-modal_input_field]",
  };

  getButton(name) {
    return this.buttons[cy.nameToProp(name)];
  }

  clickButton(name) {
    if (cy.nameToProp(name) === "move_to_this_folder") this.submitForm();
    else cy.get(this.mainContainer).find(this.buttons[cy.nameToProp(name)]).click({ force: true });
  }

  submitForm() {
    cy.intercept("PUT", `/api/files/move/multiply`).as("moveFile");
    cy.get(this.buttons.move_to_this_folder).click({ force: true });
    return cy.wait("@moveFile");
  }

  selectTargetFolder(folderName) {
    cy.get(this.selectors.main_container).contains(folderName).parents("div.rstcustom__row").click({ force: true });
  }
}
export default MoveFile;
