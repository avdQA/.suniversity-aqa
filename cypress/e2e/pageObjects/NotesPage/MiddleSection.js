class MiddleSection {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }
  selectors = {
    main_container: "section.note-page > div.note-page-menu",
    createFirstLink: "div.note-page-menu-empty button",
    plusButton: "header > button",
  };

  createFirstNote() {
    cy.intercept("POST", "/api/wikis").as("createNote");
    cy.get(this.mainContainer).find(this.selectors.createFirstLink).click({ force: true });
    return cy.wait("@createNote");
  }

  createNoteByPlusButton() {
    cy.intercept("POST", "/api/wikis").as("createNote");
    cy.get(this.mainContainer).find(this.selectors.plusButton).click({ force: true });
    return cy.wait("@createNote");
  }
}
export default MiddleSection;
