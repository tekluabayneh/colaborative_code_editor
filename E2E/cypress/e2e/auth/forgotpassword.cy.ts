 
describe("forogot password test", () => { 
  
	it("should not verify user if email are invalid", () => {
        cy.visit("http://localhost:3000")
	cy.get(`[data-testid="signin_btn"]`).should("be.visible")
	cy.get(`[data-testid="signin_btn"]`).click()
	cy.url().should("include", "Auth")
	cy.get(`[data-testid="forgot_btn"]`).click()
	cy.url().should("include", "forgotPassword")
	cy.contains("label", "Email address").parent().find('input').type("fake_email@gmail.com")
	cy.contains("button", "Send reset link").should('be.visible')
	cy.contains("button", "Send reset link").click()
       cy.contains("user is not found with the email of fake_email@gmail.com", {timeout:100}).should("exist")
}) 

	it.only("should not verify user if email are invalid", () => {
        cy.visit("http://localhost:3000")
	cy.get(`[data-testid="signin_btn"]`).click()
	cy.get(`[data-testid="forgot_btn"]`).click()
	cy.contains("label", "Email address").parent().find('input').type("tekluabayneh@gmail.com")
	cy.contains("button", "Send reset link").click()
       cy.contains("reset-password send successfully", {timeout:100}).should("exist")
	cy.contains("We sent a reset link to tekluabayneh@gmail.com").should("exist")
}) 





}) 
