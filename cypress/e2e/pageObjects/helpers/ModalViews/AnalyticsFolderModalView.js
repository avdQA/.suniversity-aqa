class AnalyticsFolderModalView {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  title = "Analytics";

  selectors = {
    main_container: "section.modal.modal-analytics",
  };

  quantities = {
    files: "div.analytics__modal__content__file div.analytics__modal__content__file__text span:first-child",
    folders: "div.analytics__modal__content__folder div.analytics__modal__content__folder__text span:first-child",
    views: "div[class$='__item']:nth-child(1) span:last-child",
    downloaded: ".analytics__modal__info > :nth-child(2) > :nth-child(3)",
    comments: "div[class$='__item']:nth-child(3) span:last-child",
    members: "div[class$='__item']:nth-child(4) span:last-child",
    guests: "div[class$='__item']:nth-child(5) span:last-child",
  };

  buttons = {
    close: "button.modal__exit",
    advanced_analytics: "xxxxx",
  };

  getButton(name) {
    return this.buttons[cy.nameToProp(name)];
  }

  clickButton(name) {
    cy.get(this.mainContainer).find(this.buttons[cy.nameToProp(name)]).click({ force: true });
  }

  getQuantity(name) {
    return cy.get(this.mainContainer).find(this.quantities[cy.nameToProp(name)]);
  }
}
export default AnalyticsFolderModalView;
