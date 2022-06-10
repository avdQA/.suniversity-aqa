class Colors {
  selectors = {
    empty: "[data-test='entity-settings_color_[empty]']",
    empty_hex: "#E9EBEF",
    empty_num: 1,
    purple: "[data-test='entity-settings_color_[purple]']",
    purple_hex: "#C085EC",
    purple_num: 2,
    orange: "[data-test='entity-settings_color_[orange]']",
    orange_hex: "#F2A44C",
    orange_num: 3,
    blue: "[data-test='entity-settings_color_[blue]']",
    blue_hex: "#0F73EF",
    blue_num: 4,
    green: "[data-test='entity-settings_color_[green]']",
    green_hex: "#3AB36C",
    green_num: 5,
    red: "[data-test='entity-settings_color_[red]']",
    red_hex: "#ED1D2D",
    red_num: 6,
  };

  selectColor(name) {
    cy.intercept("POST", `/api/files/*/color`).as("postColor");
    cy.get(this.selectors[cy.nameToProp(name)]).click({ force: true });
    return cy.wait("@postColor");
  }

  getColorHex(name) {
    return this.selectors[`${cy.nameToProp(name)}_hex`];
  }

  setColorToItem(color, targetSlug) {
    const options = {
      url: `${Cypress.config("stage").apiUrl}/api/files/${targetSlug}/color`,
      method: "POST",
      headers: { "x-token": localStorage.getItem("X-Token") },
      body: { color: this.selectors[`${cy.nameToProp(color)}_num`] },
    };
    cy.request(options)
      .as("setColorToItem")
      .then((resp) => {
        if (resp.status === 201) {
          cy.log(`_> COLOR set successfully`);
        } else expect(resp.status, "[set COLOR is 201]").to.eq(201);
      });
  }
}
export default Colors;
