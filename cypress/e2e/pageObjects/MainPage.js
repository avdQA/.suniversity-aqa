import Workspace from "./helpers/Workspace";
import SideMenu from "./helpers/SideMenu";
import DriveSection from "./helpers/sections/DriveSection";
import DeleteSection from "./helpers/sections/DeleteSection";
import NotesPage from "./NotesPage";
import SecurityPINSidebar from "./helpers/rightSidebar/SecurityPINSidebar";

class MainPage {
  sections = {
    files: new DriveSection(),
    deleted: new DeleteSection(),
    notes: new NotesPage(),
  };

  sideMenu = new SideMenu();
  securityPINSidebar = new SecurityPINSidebar();
  workspace = new Workspace();

  path = "/main";

  data = {};
  activeUser = {};

  visit() {
    return cy.visit(this.path);
  }

  getSection(name) {
    return this.sections[cy.nameToProp(name)];
  }
}
export default MainPage;
