class DeletedTopbar {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  selectors = {
    main_container: "[data-test='main-header_action_buttons']",
  };

  buttons = {
    restore: "[data-test='main-header_restore_button']",
    delete: "[data-test='main-header_delete_button']",
  };

  clickButton(name) {
    cy.get(this.mainContainer).find(this.buttons[cy.nameToProp(name)]).click({ force: true });
  }
}
export default DeletedTopbar;
