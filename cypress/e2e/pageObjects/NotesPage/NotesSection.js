class NotesSection {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }
  selectors = {
    main_container: "section.note-page",
    note_title: "header > input.note-page-file-name",
    note_textarea: "iframe",
  };

  threedotMenu = new NotesEditorThreeDotMenu();
  editorToolbar = new NotesEditorToolbar();

  getElement(name) {
    name = cy.nameToProp(name);
    return cy.get(this.mainContainer).find(this.selectors[name]);
  }

  getEditor() {
    return cy.get(this.mainContainer).find("iframe").its("0.contentDocument").its("body").then(cy.wrap);
  }
}
export default NotesSection;

class NotesEditorThreeDotMenu {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }
  selectors = {
    main_container: "section.note-page header .file-action",
    threedot_button: ".dots-action button",
  };
  menuItems = {
    save: ".file-action__list > button.option-save",
    print: ".file-action__list > button.option-print",
    download_as_pdf: ".file-action__list > button.option-download-pdf",
    download_as_docx: ".file-action__list > button.option-download-docx",
    delete: ".file-action__list > button.option-delete",
  };

  clickonThreedotButton() {
    cy.get(this.mainContainer).find(this.selectors.threedot_button).click({ force: true });
  }

  selectItem(name) {
    const { data } = Cypress.env("activePage");
    name = cy.nameToProp(name);
    this.setIntercept(name);
    cy.get(this.mainContainer).find(this.menuItems[name]).click({ force: true });
    cy.wait(data.intercept);
  }

  setIntercept(name) {
    const { data } = Cypress.env("activePage");
    switch (name) {
      case "download_as_pdf":
        data.intercept = "@downloadNoteAsPDF";
        cy.intercept("GET", `/api/wikis/${data.targetNoteID}/export/pdf`).as("downloadNoteAsPDF");
        break;
      case "download_as_docx":
        data.intercept = "@downloadNoteAsDOCX";
        cy.intercept("GET", `/api/wikis/${data.targetNoteID}/export/docx`).as("downloadNoteAsDOCX");
        break;
      case "save":
        data.intercept = "@updateNote";
        cy.intercept("PUT", `/api/wikis/${data.targetNoteID}`).as("updateNote");
        break;
      case "delete":
        data.intercept = "@deleteNote";
        cy.intercept("DELETE", `/api/wikis/${data.targetNoteID}`).as("deleteNote");
        break;
      default:
        break;
    }
  }
}

class NotesEditorToolbar {
  constructor() {
    this.mainContainer = "div[role='application'] div.tox-editor-header";
  }

  toolbarButtons = {
    undo: "button[aria-label='Undo']",
    redo: "button[aria-label='Redo']",
  };

  clickonToolbarButton(buttonName) {
    const { data } = Cypress.env("activePage");
    buttonName = cy.nameToProp(buttonName);
    this.setIntercept(buttonName);
    cy.get(this.mainContainer).find(this.toolbarButtons[buttonName]).click({ force: true });
    cy.wait(data.intercept);
  }

  setIntercept(name) {
    const { data } = Cypress.env("activePage");
    switch (name) {
      case "undo":
      case "redo":
        data.intercept = "@updateNote";
        cy.intercept("PUT", `/api/wikis/${data.targetNoteID}`).as("updateNote");
        break;
      default:
        break;
    }
  }
}
