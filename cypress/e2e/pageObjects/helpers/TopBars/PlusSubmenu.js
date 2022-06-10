class PlusSubmenu {
  items = {
    create_folder: "[data-test='header-add-new_create-folder_button']",
    upload_file: "[data-test='header-add-new_create-file_button']",
    create_document: "[data-test='header-add-new_create-document_button']",
  };

  selectItem(name) {
    return cy.get(this.items[cy.nameToProp(name)]).click({ force: true });
  }
}
export default PlusSubmenu;
