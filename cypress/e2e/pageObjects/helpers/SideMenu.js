import MenuSideMenuSection from "./SideMenu/MenuSideMenuSection";
import WorkspaceSideMenuSection from "./SideMenu/WorkspaceSideMenuSection";
import FooterSideMenuSection from "./SideMenu/FooterSideMenuSection";

class SideMenu {
  workspace = new WorkspaceSideMenuSection();
  menu = new MenuSideMenuSection();
  footer = new FooterSideMenuSection();

  top = {
    container: "body",
    workspaceButton: "[data-test='main-sidebar_workspace_menu_open-button']",
    newWorkspaceButton: "[data-test='main-sidebar_workspace_menu_add-workspace-button']",
    workspaces: "[data-test^='main-sidebar_workspace_menu_item-button[']",
    workspaceNavItems: {
      name: "[data-test='main-sidebar_workspace_menu_item-name-span']",
      settings: "",
      members: "",
      applications: "",
    },
    navItems: {
      files: "[data-test='sidebar-button-Files']",
      files_path: "/main",
      documents_path: "/documents",
      notes: "[data-test='sidebar-button-Secret Notes']",
      notes_path: "/notes",
      shared: "[data-test='sidebar-button-Shared']",
      shared_path: "/sharing",
      recent: "[data-test='sidebar-button-Recent']",
      recent_path: "/recent",
      automation: "[data-test='sidebar-button-Automation']",
      automation_path: "/events",
      comments: "[data-test='sidebar-button-Comments']",
      comments_path: "/comments",
      deleted: "[data-test='sidebar-button-Deleted']",
      deleted_path: "/deleted",
    },
  };
  bottom = {
    container: "",
  };
  popUps = {
    newWorkSpace: {
      container: "section[class='modal']",
      closeButton: "button[class='modal__exit']",
      fieldName: "lebel input[name='workspace']",
      nextButton: "Next",
    },
  };

  addNewWorkspace() {
    cy.get(this.top.container).find(this.top.newWorkspaceButton).click({ force: true });
    // cy.get(this.popUps.newWorkSpace.container).find(this.popUps.newWorkSpace.fieldName).type("asdasd"); //TODO
    // cy.get(this.popUps.newWorkSpace.container).find(this.popUps.newWorkSpace.nextButton).click({force:true});
  }

  getWorkspaces() {
    return cy.get(this.top.container).find(this.top.workspaces);
  }

  getNotActiveWorkspaces() {
    return cy.get(this.top.container).find(this.top.workspaces);
  }

  getWorkspaceMenu() {
    return cy.get(this.top.container).find(this.top.workspaceButton);
  }

  getWorkspaceMenuItem(item) {
    return cy.get(this.top.container).find(this.top.workspaceNavItems[item]);
  }

  getNewWorkspace() {
    return cy.get(this.top.container).find(this.top.newWorkspaceButton);
  }

  selectItem(itemName) {
    itemName = cy.nameToProp(itemName);
    switch (itemName) {
      case "notes":
        this.selectNotes();
        break;
      default:
        cy.get(this.top.container).find(this.top.navItems[itemName]).click({ force: true });
        break;
    }
  }

  selectItemWithStub(itemName) {
    const { data } = Cypress.env("activePage");
    itemName = cy.nameToProp(itemName);

    switch (itemName) {
      case "notes":
        cy.intercept("/api/wikis").as("waitNotes");
        data.intercept = "@waitNotes";
        break;
      default:
        break;
    }

    cy.visit(this.top.navItems[`${itemName}_path`]);
    cy.window().then((win) => {
      cy.stub(win, "print").as("print");
    });

    if (data.intercept) return cy.wait(data.intercept);
  }

  selectNotes() {
    cy.intercept("/api/wikis").as("waitNotes");
    cy.get(this.top.container).find(this.top.navItems.notes).click({ force: true });
    return cy.wait("@waitNotes");
  }
}
export default SideMenu;
