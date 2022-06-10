class MenuSideMenuSection {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }
  selectors = {
    main_container: "div[class^='style_topContainer__'] div[class*='style_mainNavTogglable__']",
    drive: "ul li a[href='/main']",
    documents: "ul li a[href='/documents']",
    notes: "ul li a[href='/notes']",
    shared: "ul li a[href='/sharing']",
    recent: "ul li a[href='/recent']",
    events: "ul li a[href='/events']",
    comments: "ul li a[href='/comments']",
    deleted: "ul li a[href='/deleted']",
  };

  selectItem(itemName) {
    itemName = cy.nameToProp(itemName);
    cy.get(this.mainContainer).find(this.selectors[itemName]).click({ force: true });
  }
}
export default MenuSideMenuSection;
