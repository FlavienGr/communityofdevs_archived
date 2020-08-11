describe("login page", () => {
  beforeEach(function () {
    cy.exec("npm run db:delete");
    cy.exec("npm run db:seed");
    cy.fixture("users.json").as("users");
  });
  it("Should successfully loads", () => {
    cy.visit("/login");
  });
  it("Should find a form", () => {
    cy.get("form");
  });
  it("Sould have input elements email, password", () => {
    cy.get("input[name=email]");
    cy.get("input[name=password]");
  });
  it("Sould failed to log in if no data", function () {
    cy.get('button[type="submit"]').click();
    cy.get("[data-cy=span-email]").contains("L'email doit être spécifié");
  });
  it("Sould log in", function () {
    const { userOne } = this.users;
    cy.get("input[name=email]").type(userOne.email);
    cy.get("input[name=password]").type(userOne.password);
    cy.get('button[type="submit"]').click();
    cy.getCookies();
  });
});
