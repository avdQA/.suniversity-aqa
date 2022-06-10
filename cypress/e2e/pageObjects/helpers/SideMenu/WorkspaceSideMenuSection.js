class WorkspaceSideMenuSection {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  selectors = {
    main_container: "div[class^='style_topContainer__'] div[class*='style_workspaceMenuWrapper__']",
    workspaceButton: "div[role='button']",
    newWorkspaceButton: "[data-test='main-sidebar_workspace_menu_add-workspace-button']",
    workspaces: "ul li[role='button'][data-test^='main-sidebar_workspace_menu_item-button[']",
    activeWorkspace: "[data-test='main-sidebar_workspace_menu_item-button[0]']",
    workspaceNavItems: {
      name: "div[class^='style_menuItem__']>span",
      settings: "[data-test='main-sidebar_workspace_menu_item-button_settings']",
      members: "[data-test='main-sidebar_workspace_menu_item-button_members']",
      applications: "",
    },
  };
}
export default WorkspaceSideMenuSection;
