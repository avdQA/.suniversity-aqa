class PreviewImageModelView {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  selectors = {
    main_container: "div.file-view__content",
    header_container: "header.file-view__header",
    file_title: "div.file-view__title",
    back_button: "button[data-test$='_go-back_button']",
    download_button: "header [data-test$='_download_link']",
    print_button: "header [data-test$='_print_button']",
    threedot_menu_button: "header [data-test$='_file-actions_button']",
  };

  buttons = {
    back: "button[data-test$='_go-back_button']",
    download: "header [data-test$='_download_link']",
    print: "header [data-test$='_print_button']",
    threedot_menu: "header [data-test$='_file-actions_button']",
  };

  getSelector(name) {
    return this.selectors[cy.nameToProp(name)];
  }

  getElement(name) {
    return cy.get(this.mainContainer).find(this.selectors[cy.nameToProp(name)]);
  }

  getButton(name) {
    return this.buttons[cy.nameToProp(name)];
  }

  clickButton(name) {
    name = cy.nameToProp(name);
    if (name === "download") this.downloadItem();
    else cy.get(this.mainContainer).find(this.buttons[name]).click({ force: true });
  }

  selectThreedotMenuItem() {
    // cy.intercept("PUT", `/api/files/move/multiply`).as("moveFile");
    // cy.get(this.buttons.move_to_this_folder).click({force:true});
    // return cy.wait("@moveFile");
  }

  downloadItem() {
    cy.intercept("*.ipfs.infura-ipfs.io").as("downloadItem");
    // cy.intercept("/api/files/mix/download?**").as("downloadItem");
    cy.get(this.mainContainer).find(this.buttons.download).click({ force: true });
    return cy.wait("@downloadItem");
  }
}
export default PreviewImageModelView;
