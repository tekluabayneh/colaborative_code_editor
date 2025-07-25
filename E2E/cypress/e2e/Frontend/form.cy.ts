/// <reference types="cypress" />

describe("form test", () => {
  it("it should register", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Sign in").click();

    cy.get(`[data-testid="testid_email"]`).type("");
    cy.get(`[data-testid="testid_password"]`).type("");
  });
});
