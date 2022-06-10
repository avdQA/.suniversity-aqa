import FolderContextmenu from "../contextMenu/FolderContextmenu";
import FileContextmenu from "../contextMenu/FileContextmenu";
import CreateFolderModalView from "../ModalViews/CreateFolderModalView";
import RenameFolderModalView from "../ModalViews/RenameFolderModalView";
import RenameFile from "../ModalViews/RenameFile";
import MoveFile from "../ModalViews/MoveFile";
import PreviewImageModelView from "../ModalViews/PreviewImageModelView";
import AnalyticsFileModalView from "../ModalViews/AnalyticsFileModalView";
import AnalyticsFolderModalView from "../ModalViews/AnalyticsFolderModalView";
import DriveTopbar from "../TopBars/DriveTopbar";
import RightSidebar from "../rightSidebar/RightSidebar";

class DriveSection {
  constructor() {
    this.mainContainer = this.selectors.main_container;

    this.contextMenu = {
      folder: new FolderContextmenu(),
      file: new FileContextmenu(),
    };

    this.modals = {
      create_folder: new CreateFolderModalView(),
      rename_folder: new RenameFolderModalView(),
      rename_file: new RenameFile(),
      move_file: new MoveFile(),
      preview_image: new PreviewImageModelView(),
      analytics_file: new AnalyticsFileModalView(),
      analytics_folder: new AnalyticsFolderModalView(),
    };
  }

  rightSidebar = new RightSidebar();
  topbarMenu = new DriveTopbar();

  buttons = {
    plus: "[data-test='main-header_action-page_add_button']",
    upload: "[data-test='main-header_action-page_upload_button']",
    download: "[data-test='main-header_action-page_download_button']",
    delete: "[data-test='main-header_action-page_delete_button']",
  };

  selectors = {
    main_container: "div.main-container",
    item_container: "section[data-test^='folder-container_folder_actions[']",
    item_checkbox: "[data-test='checkbox']",
  };

  getButton(name) {
    return this.buttons[cy.nameToProp(name)];
  }

  getContext(name) {
    return this.contextMenu[cy.nameToProp(name)];
  }

  getModalView(name) {
    return this.modals[cy.nameToProp(name)];
  }

  getSelector(name) {
    return this.selectors[cy.nameToProp(name)];
  }

  setColorToItem(color, targetSlug) {
    const tab = this.rightSidebar.getTab("main");
    const colorPart = tab.getPart("Colors");
    colorPart.setColorToItem(color, targetSlug);
    return cy.get("@setColorToItem");
  }

  checkTargetItem(targetItemName, targetItemSlug, fileExtension) {
    const targetClass = fileExtension ? "active" : "folder_selected";
    cy.get(this.mainContainer)
      .contains(targetItemName)
      .parents(`section[data-test*='${targetItemSlug}']`)
      .then((entity) => {
        cy.get(entity).scrollIntoView().trigger("mouseover", { force: true }).find(this.getSelector("Item checkbox")).find("input").check({ force: true });
        cy.get(entity).should("to.have.class", targetClass);
      });
  }
}
export default DriveSection;
