describe("login page", () => {
  beforeEach(function () {
    cy.login();
    cy.fixture("project.json").as("project");
  });
  it("Should successfully loads", () => {
    cy.visit("/newproject");
  });
  it("Should find a form", () => {
    cy.get("form");
  });
  it("Sould have input name, description, summary element", () => {
    cy.get("input[name=name]");
    cy.get("textarea[name=summary]");
    cy.get("input[name=description]");
  });
  it("Sould failed to send in if no data", function () {
    cy.get('button[type="submit"]').click();
    cy.get("[data-cy=span-name]").contains("Un nom doit être ajouté au projet");
    cy.get("[data-cy=span-summary]").contains(
      "Un résumé du projet doit être spécifié"
    );
    cy.get("[data-cy=span-description]").contains(
      "Un fichier Pdf doit être ajouté"
    );
  });
});
