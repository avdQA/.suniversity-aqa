class TermAndConditions {
  title = "GhostDrive | Terms of Services";
  path = "/terms-of-service";
  selectors = {
    targets: {
      h1: "Terms and Conditions",
    },
    wrapper: ".auth-footer-info",
    customer_terms_of_service: "[data-test='auth_footer_info_terms-of-service_link']",
    privacy_policy: "[data-test='auth_footer_info_privacy-policy_link']",
    cookie_policy: "[data-test='auth_footer_info_cookie_policy_link']",
  };

  getPrivacyLink(selectorName) {
    selectorName = selectorName.toLowerCase().replaceAll(" ", "_");
    return cy.get(this.selectors.wrapper).find(this.selectors[selectorName]);
  }
}
export default TermAndConditions;
