describe("My First Test", () => {
  it("Visit gomoku project", () => {
    cy.visit("/");

    cy.get("h2").should("contain", "Turn: Player One");

    cy.get("ul:first-of-type > li:first-child")
      .click()
      .should("contain", "X");
    cy.get("h2").should("contain", "Turn: Player Two");
    cy.get("ul:first-of-type > li:first-child")
      .click()
      .get("h6")
      .should("contain", "Not empty");
    cy.get("ul:first-of-type > li:nth-child(2)")
      .click()
      .should("contain", "O");
  });
});
