class Tags {
  constructor() {
    this.mainContainer = this.selectors.container;
  }

  selectors = {
    container: "section.entity-settings__tags",
  };

  buttons = {
    add_tags: "[data-test='tags_add-tag_button']",
    submit: "[data-test='tags_create_next-tag_button']",
  };

  fields = {
    tag: "[data-test='tags_add-tag_section'] input",
  };

  clickOnCreateTag() {
    cy.intercept("POST", `/api/files/*/tags`).as("postTag");
    cy.get(this.buttons.submit).click({ force: true });
    return cy.wait("@postTag");
  }

  getButton(name) {
    return cy.get(this.selectors.container).find(this.buttons[cy.nameToProp(name)]);
  }

  getElement(name) {
    return cy.get(this.selectors.container).find(this.selectors[cy.nameToProp(name)]);
  }

  getField(name) {
    return cy.get(this.selectors.container).find(this.fields[cy.nameToProp(name)]);
  }
}
export default Tags;
