describe("Home page", () => {
  it("Should successfully loads", () => {
    cy.visit("/");
  });
  it("Sould have a navbar with home, Développeurs, connexion", () => {
    cy.visit("/");
    cy.contains("CommunityOfDevs");
    cy.get('a[href="/devs"]').should("have.text", "Développeurs");
    cy.get('a[href="/login"]').should("have.text", "Connexion");
  });
  it("should have a H1", () => {
    cy.visit("/");
    cy.get('a[href="/"]').should("have.text", "CommunityOfDevs");
  });
});
