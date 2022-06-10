class DeletedContextMenu {
  items = {
    restore: "[data-test='context-menu_item_restoreFromTrash']",
    delete_permanently: "[data-test='context-menu_item_removeFromTrash']",
  };

  selectItem(name) {
    cy.get(this.items[cy.nameToProp(name)]).click({ force: true });
  }

  getItem(name) {
    return this.items[cy.nameToProp(name)];
  }
}
export default DeletedContextMenu;
