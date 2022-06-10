class ChromeWebStoreMetaMask {
  path = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
  selectors = {
    add_plugin_button: "div[role='button']",
  };

  visit() {
    cy.visit(this.path);
  }

  addPlugin() {
    // cy.pause();
    // cy.get(this.selectors.add_plugin_button).click({force:true});
  }
}
export default ChromeWebStoreMetaMask;
