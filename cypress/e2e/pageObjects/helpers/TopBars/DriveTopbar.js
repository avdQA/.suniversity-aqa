import PlusSubmenu from "./PlusSubmenu";

class DriveTopbar {
  constructor() {
    this.mainContainer = this.selectors.main_container;
    this.buttonsSubmenu = {
      plus_button: new PlusSubmenu(),
    };
  }

  selectors = {
    main_container: "[data-test='main-header_action_buttons']",
  };

  buttons = {
    plus: "[data-test='main-header_action-page_add_button']",
    upload: "[data-test='main-header_action-page_upload_button']",
    download: "[data-test='main-header_action-page_download_button']",
    delete: "[data-test='main-header_action-page_delete_button']",
  };

  getSubmenu(menuName) {
    return this.buttonsSubmenu[cy.nameToProp(menuName)];
  }

  clickButton(name) {
    name = cy.nameToProp(name);
    if (name === "download") this.downloadItem();
    if (name === "upload") this.uploadItem();
    else cy.get(this.mainContainer).find(this.buttons[name]).click({ force: true });
  }

  downloadItem() {
    cy.intercept("*.ipfs.infura-ipfs.io").as("downloadItem");
    cy.intercept("/api/files/mix/download?**").as("downloadItem");
    cy.get(this.mainContainer).find(this.buttons.download).click({ force: true });
    return cy.wait("@downloadItem");
  }

  uploadItem() {
    cy.intercept("/api/me").as("uploadItem");
    cy.get(this.mainContainer).find(this.buttons.upload).click({ force: true });
    return cy.wait("@uploadItem");
  }
}
export default DriveTopbar;
