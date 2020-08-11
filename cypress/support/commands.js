Cypress.Commands.add("login", () => {
  // grab the user
  cy.fixture("users.json").as("users");

  cy.exec("npm run db:delete && npm run db:seed");
  cy.visit("/login");
  cy.get("input[name=email]").type(userOne.email);
  cy.get("input[name=password]").type(`${userOne.password}{enter}`);
});
Cypress.Commands.add("logout", () => {
  cy.get("[data-cy=button-profile] > button").click();
});
