import TermAndConditions from "./helpers/TermsAndCondinions";

class SignInCrypto {
  title = "Ghost Drive";
  path = "/sign-in-crypto";
  selectors = {
    buttons: {
      login_with_metamask: "header+div header button[type='submit']",
      login_with_metamask_text: "metamask",
      login_with_phantom: "header header button[type='submit']",
      login_with_phantom_text: "phantom",
    },
    links: {
      nft_pass: "[class='auth-crypto-footer'] a[class='sign-in-link']",
    },
  };
  constructor() {
    this.termAndConditions = new TermAndConditions();
  }

  visit() {
    return cy.visit(this.path);
  }

  getButton(buttonName) {
    buttonName = buttonName.toLowerCase().replaceAll(" ", "_");
    return cy.get(this.selectors.buttons[buttonName]).first();
  }
}
export default SignInCrypto;
