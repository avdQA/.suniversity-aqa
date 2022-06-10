import { Then } from "cypress-cucumber-preprocessor/steps";

Then("the print operation must be called only once", () => {
  // cy.wait(5000);
  // cy.window().then((win) => {
  //   // win.print();
  //   expect(win.print).to.be.calledOnce;
  // });
  cy.get("@print").should("have.been.calledOnce");
});
