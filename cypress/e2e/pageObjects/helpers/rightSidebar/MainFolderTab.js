import Colors from "./mainSection/Colors";
import Tags from "./mainSection/Tags";

class MainFolderTab {
  constructor() {
    this.parts = {
      tags: new Tags(),
      colors: new Colors(),
    };
  }

  getPart(name) {
    return this.parts[cy.nameToProp(name)];
  }
}
export default MainFolderTab;
