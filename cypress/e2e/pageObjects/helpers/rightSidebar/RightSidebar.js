import MainFolderTab from "./MainFolderTab";
import CommentsFolderTab from "./CommentsFolderTab";
import SecurityTab from "./SecurityTab";

class RightSidebar {
  constructor() {
    this.mainContainer = this.selectors.container;
  }

  selectors = {
    container: "section.entity-settings.right-menu",
    main: "[data-test='action-tabs_info_button']",
    share: "[data-test='action-tabs_share_button']",
    security: "[data-test='action-tabs_locker_button']",
    comments: "[data-test='action-tabs_message_button']",
  };

  tabs = {
    main: new MainFolderTab(),
    comments: new CommentsFolderTab(),
    security: new SecurityTab(),
  };

  getTab(name) {
    return this.tabs[cy.nameToProp(name)];
  }

  selectTab(name) {
    cy.get(this.mainContainer)
      .find(this.selectors[`${cy.nameToProp(name)}`])
      .click({ force: true });
    return this.tabs[cy.nameToProp(name)];
  }
}
export default RightSidebar;
