import DeletedContextMenu from "../contextMenu/DeletedContextMenu";
import DeletePermanently from "../ModalViews/DeletePermanently";
import RestoreModalView from "../ModalViews/RestoreModalView";
import DeletedTopbar from "../TopBars/DeletedTopBar";

class DeleteSection {
  constructor() {
    this.mainContainer = this.selectors.main_container;
    this.contextMenu = {
      folder: new DeletedContextMenu(),
      file: new DeletedContextMenu(),
    };
    this.modals = {
      delete_permanently: new DeletePermanently(),
      restore: new RestoreModalView(),
    };
  }

  topbarMenu = new DeletedTopbar();

  selectors = {
    main_container: "div.main-container section",
    item_container: "section[data-test^='folder-container_folder_actions[']",
    item_checkbox: "[data-test='checkbox']",
  };

  getItemContext() {
    return new DeletedContextMenu();
  }

  getContext(name) {
    return this.contextMenu[cy.nameToProp(name)];
  }

  getModalView(modalViewName) {
    return this.modals[cy.nameToProp(modalViewName)];
  }

  getTopBar(name) {
    return this.topbarMenu;
  }

  getSelector(name) {
    return this.selectors[cy.nameToProp(name)];
  }

  getMainContainer() {
    return cy.get(this.mainContainer);
  }

  checkTargetItem(targetItemName, targetItemSlug, fileExtension) {
    const targetClass = fileExtension ? "active" : "folder_selected";
    cy.get(this.mainContainer)
      .contains(targetItemName)
      .parents(`section[data-test*='${targetItemSlug}']`)
      .then((entity) => {
        cy.get(entity).scrollIntoView().trigger("mouseover", { force: true }).find(this.getSelector("Item checkbox")).find("input").check({ force: true });
        cy.get(entity).should("to.have.class", targetClass);
      });
  }
}
export default DeleteSection;
