Cypress.Commands.add("login", () => {
  cy.exec("npm run db:delete && npm run db:seed");

  cy.fixture("users").then(({ userOne }) => {
    cy.request("POST", "http://localhost:5000/api/v1/user/auth/login", {
      email: userOne.email,
      password: userOne.password,
    }).its("body");
  });
});
Cypress.Commands.add("logout", () => {
  cy.get("[data-cy=button-profile] > button").click();
});
