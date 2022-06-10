import TermAndConditions from "./helpers/TermsAndCondinions";

class LoginPage {
  title = "Ghost Drive";
  path = "/sign-in";
  selectors = {
    inputs: {
      email: "input[name='username']",
      password: "input[name='password']",
    },
    buttons: {},
    links: {},
  };
  data = {};

  constructor() {
    this.termAndConditions = new TermAndConditions();
  }

  visit() {
    cy.visit(this.path);
  }
}
export default LoginPage;

class SignUpCrypto {
  title = "Ghost Drive";
  path = "/sign-up-crypto";
  selectors = {
    buttons: {
      sign_up_metamask: ".crypto-sign-up-wrapper button.crypto-sign-up-select-item",
      sign_up_metamask_text: "metamask", // workaround
      sign_up_phantom: ".crypto-sign-up-wrapper button.crypto-sign-up-select-item",
      sign_up_phantom_text: "phantom", // workaround
      back: ".crypto-sign-up-wrapper button.crypto-sign-up-actions__back",
    },
    links: {
      logo: "header a[class='header__logo']",
      login_link: "a[href$='/sign-in-crypto']",
      term_of_service: "[class='auth-crypto-footer'] a[href='href$='terms-of-service']",
      privacy_policy: "[class='auth-crypto-footer'] a[href='href$='privacy']",
      cookie_policy: "[class='auth-crypto-footer'] a[href='href$='privacy']",
    },
  };
}
