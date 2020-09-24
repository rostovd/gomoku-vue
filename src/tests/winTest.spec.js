describe("Winner test", () => {
  function playersTurn(line, expected) {
    const turns = 5;
    switch (line) {
      case "horizontal":
        for (let i = 1; i <= turns; i++) {
          cy.get(`[data-cy=row]:nth-of-type(1) > li:nth-child(${i})`).click();
          cy.get(`[data-cy=row]:nth-of-type(2) > li:nth-child(${i})`).click();
        }
        cy.get("[data-cy=winner]").should("contain", expected);
        break;
      case "vertical":
        for (let i = 1; i <= turns; i++) {
          cy.get(`[data-cy=row]:nth-of-type(${i}) > li:nth-child(1)`).click();
          cy.get(`[data-cy=row]:nth-of-type(${i}) > li:nth-child(2)`).click();
        }
        cy.get("[data-cy=winner]").should("contain", expected);
        break;
      case "diagonal":
        for (let i = 1; i <= turns; i++) {
          cy.get(
            `[data-cy=row]:nth-of-type(${i}) > li:nth-child(${i})`
          ).click();
          cy.get(
            `[data-cy=row]:nth-of-type(8) > li:nth-child(${i + 1})`
          ).click();
        }
        cy.get("[data-cy=winner]").should("contain", expected);
        break;
    }
  }

  it("Visit gomoku project", () => {
    cy.visit("/");
  });

  it("Horizontal win", () => {
    playersTurn("horizontal", "Player One is a winner");
    cy.get("[data-cy=reload]").click();
  });
  it("Vertical win", () => {
    playersTurn("vertical", "Player One is a winner");
    cy.get("[data-cy=reload]").click();
  });
  it("Diagonal win", () => {
    playersTurn("diagonal", "Player One is a winner");
  });
});
