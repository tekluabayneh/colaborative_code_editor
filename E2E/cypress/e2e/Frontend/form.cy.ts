/// <reference types="cypress" />


describe("form test", () => {
  it("it should register", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Sign in").click();
    cy.get(`[data-testid="DontHave_Account"]`).click() 


    cy.get(`[data-testid="testid_username"]`).type("Jone");
    cy.get(`[data-testid="testid_email"]`).type("example@gmail.com");
    cy.get(`[data-testid="testid_password"]`).type("this work ma");

   cy.get(`[data-testid="Register_button"]`).click()

  });


  it("it should login", () => {
     cy.visit("http://localhost:3000");
     cy.contains("Sign in").click();
    cy.get(`[data-testid="testid_email_login"]`).type("example@gmail.com");
    cy.get(`[data-testid="testid_password_login"]`).type("this work ma");

    cy.get(`[data-testid="testid_login_button"]`).click() 



});
});
