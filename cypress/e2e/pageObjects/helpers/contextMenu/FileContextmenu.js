class FileContextmenu {
  constructor() {
    this.mainContainer = "section.context-menu";
  }

  items = {
    preview: "[data-test='context-menu_item_viewFile']",
    acces_preferences: "[data-test='context-menu_item_accessPreferences']",
    move: "[data-test='context-menu_item_showMove']",
    rename: "[data-test='context-menu_item_edit']",
    color: "[data-test='context-menu_item_color']",
    tag: "[data-test='context-menu_item_tag']",
    comment: "[data-test='context-menu_item_comment']",
    download: "[data-test='context-menu_item_download']",
    add_geo_secutity: "[data-test='context-menu_item_geoSecurity']",
    security: "[data-test='context-menu_item_goToSecuritySettings']",
    analytics: "[data-test='context-menu_item_analytics']",
    delete: "[data-test='context-menu_item_remove']",
  };

  getItem(name) {
    return this.items[cy.nameToProp(name)];
  }

  selectItem(name) {
    name = cy.nameToProp(name);
    name === "download" ? this.downloadItem() : cy.get(this.mainContainer).find(this.items[name]).click({ force: true });
  }

  downloadItem() {
    cy.intercept("*.ipfs.infura-ipfs.io").as("downloadItem");
    cy.get(this.mainContainer).find(this.items.download).click({ force: true });
    return cy.wait("@downloadItem");
  }
}
export default FileContextmenu;
