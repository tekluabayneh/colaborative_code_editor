

describe("OTP verification test", () => { 

	it("should test event click and content should change when click ", async () => { 
		cy.visit("http://localhost:3000/verifyOtp")
		const fakeOtp  = [2,3,4,5,6,2] 

		cy.get(`[data-testid="btn_verify"]`).should("be.disabled")
		fakeOtp.forEach(otp => { 
			cy.get(`[data-testid="otp_input"]`).type(`${otp}`) 
		})

		cy.get(`[data-testid="resend_btn"]`).should("be.visible")
		cy.get(`[data-testid="btn_verify"]`).should("be.not.disabled")
		cy.get(`[data-testid="btn_verify"]`).click()
		cy.get(`[data-testid="btn_verify"]`).should("contain.text", "Verifying...")
	})


	it.only("should get error message when user type invalid otp", async () => { 
		cy.visit("http://localhost:3000/verifyOtp")
		const fakeOtp  = [2,3,4,5,6,2] 
		fakeOtp.forEach(otp => { 
			cy.get(`[data-testid="otp_input"]`).type(`${otp}`) 
		})

		cy.contains("email and otp are mandatory").should("not.exist")
		cy.get(`[data-testid="btn_verify"]`).click()
		cy.contains("email and otp are mandatory").should("be.visible")
	})




})
