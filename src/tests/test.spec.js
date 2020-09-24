describe("My First Test", () => {
  it("Visit gomoku project", () => {
    cy.visit("/");
  });
  it("First player is first", () => {
    cy.get("[data-cy=whosTurn]").should("contain", "Turn: Player One");
  });
  it("Test clicks on board by First Player", () => {
    cy.get("[data-cy=row]:first-of-type > [data-cy=col]:first-child")
      .click()
      .should("contain", "X");
  });
  it("Next turn must be a Second Player", () => {
    cy.get("[data-cy=whosTurn]").should("contain", "Turn: Player Two");
  });
  it("Try to click on cell is taken", () => {
    cy.get("[data-cy=row]:first-of-type > [data-cy=col]:first-child")
      .click()
      .get("[data-cy=errMessage]")
      .should("contain", "Not empty");
  });
  it("Second Player turn", () => {
    cy.get("[data-cy=row]:first-of-type > [data-cy=col]:nth-child(2)")
      .click()
      .should("contain", "O");
  });
});
