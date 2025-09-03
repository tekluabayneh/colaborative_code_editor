describe("invitaion test", () => { 
it("should not send invitaion to use if user already invited", () => { 
	cy.visit("http://localhost:3000/Auth")
	
const GetElement = (email:string, password:string) => { 
    cy.get(`[data-testid="testid_email_login"]`).clear().type(email);
    cy.get(`[data-testid="testid_password_login"]`).clear().type(password);
	} 

	     GetElement("tekluabaynehgobena@gmail.com", "manman")
	    cy.get(`[data-testid="testid_login_button"]`).click() 

	cy.contains("user login successfully, now verify OTP",{timeout:1000}).should("be.visible") 
	cy.url().should("include", "verifyOtp")

	cy.visit("http://localhost:3000/invite")

	cy.get(`[data-testid="email_input"]`).type("zzz@email.com")
	cy.get(`[data-testid="send_invite"]`).click()

})


}) 
