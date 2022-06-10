class HomePage {
  path = "/";

  visit() {
    return cy.visit(this.path);
  }
}
export default HomePage;
