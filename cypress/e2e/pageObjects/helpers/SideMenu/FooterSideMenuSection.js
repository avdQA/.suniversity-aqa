class FooterSideMenuSection {
  constructor() {
    this.mainContainer = this.selectors.main_container;
  }
  selectors = {
    main_container: "div[class^='style_bottomContainer__']",
  };
}
export default FooterSideMenuSection;
