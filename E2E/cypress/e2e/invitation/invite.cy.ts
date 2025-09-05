describe("invitaion test", () => { 
it("should not send invitaion to use if user already invited", () => { 
	
         cy.visit("http://localhost:3000/invite")

	cy.get(`[data-testid="email_input"]`).type("zzz@email.com")
	cy.get(`[data-testid="Select-role"]`).type("Admin")
	cy.get(`[data-testid="send_invite"]`).click()

})


}) 
