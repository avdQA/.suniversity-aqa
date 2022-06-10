import MiddleSection from "./NotesPage/MiddleSection";
import NotesSection from "./NotesPage/NotesSection";

class NotesPage {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }

  selectors = {
    main_container: "div.main-container section.note-page",
    item_container: "section[data-test^='folder-container_folder_actions[']",
    item_checkbox: "[data-test='checkbox']",
  };

  middleSection = new MiddleSection();
  editorSection = new NotesSection();
}
export default NotesPage;
