describe("Signup page", () => {
  beforeEach(function () {
    cy.exec("npm run db:delete");
    cy.fixture("users.json").as("users");
  });
  it("Should successfully loads", () => {
    cy.visit("/signup");
  });
  it("Should find a form", () => {
    cy.get("form");
  });
  it("Sould have input elements name, immatriculation, email, password, cgu", () => {
    cy.get("input[name=name]");
    cy.get("input[name=email]");
    cy.get("input[name=password]");
    cy.get("input[name=immatriculation]");
    cy.get("input[name=cgu]");
  });
  it("Sould failed to log in", function () {
    cy.get('button[type="submit"]').click();
    cy.get("[data-cy=span-name]").contains("Le nom est requis");
  });
  it("Sould log in", function () {
    const { userOne } = this.users;
    cy.get("input[name=name]").type(userOne.name);
    cy.get("input[name=email]").type(userOne.email);
    cy.get("input[name=password]").type(userOne.password);
    cy.get("input[name=immatriculation]").type(userOne.immatriculation);
    cy.get("input[name=cgu]").click();
    cy.get('button[type="submit"]').click();
    cy.getCookies();
  });
});
