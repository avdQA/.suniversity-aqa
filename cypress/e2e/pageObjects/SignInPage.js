import TermAndConditions from "./helpers/TermsAndCondinions";

class SignInPage {
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
    return cy.visit(this.path);
  }
}
export default SignInPage;
