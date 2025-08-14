/// <reference types="cypress" />

import { forEach } from "cypress/types/lodash"

describe("form test", () => {

  const fillRegisterForm = (username:string,passowrd:string,email:string) => { 
   		cy.get(`[data-testid="testid_username"]`).clear().type(username)
		cy.get(`[data-testid="testid_email"]`).clear().type(passowrd)
		cy.get(`[data-testid="testid_password"]`).clear().type(email)
	}



	beforeEach(() => {
		cy.visit("http://localhost:3000");
		cy.contains("Sign in").click();
		cy.get(`[data-testid="DontHave_Account"]`).click() 
	})


	it("should password show error message and button has to be disabled", () => {
                 fillRegisterForm("fake","fake_email","fake")
		cy.contains("Password must be at least 6 characters").should("be.visible")
		cy.get(`[data-testid="Register_button"]`).should("be.disabled")
	})

	it("should return invalid email error message",() => { 

		cy.get(`[data-testid="Register_button"]`).should("be.disabled")

                 fillRegisterForm("fake","fake_work_ma","fake_email")

		cy.get(`[data-testid="Register_button"]`).should("not.be.disabled")

		cy.get(`[data-testid="Register_button"]`).click() 
		cy.contains("Invalid Form data", {timeout:2000}).should("be.visible")
	})



	it("should return error message for user already registred ", () => {
                 fillRegisterForm("jone","fake@gmail.com","fake_work_ma")

		cy.get(`[data-testid="Register_button"]`).should("not.be.disabled")
		cy.get(`[data-testid="Register_button"]`).click()

		cy.contains("user already exist please check you email ").should("be.visible") 
		cy.url().should("not.include", "/verifyOtp")
		cy.get(`[data-testid="Register_button"]`).should("be.disabled")
	})



	it("it should  get 200 success message ", () => {
                 fillRegisterForm("jone","fake_11@gmail.com","fake_work_ma")
		cy.get(`[data-testid="Register_button"]`).should("not.be.disabled")
		cy.get(`[data-testid="Register_button"]`).click()

		cy.contains("Registration successful, now verify Otp",{timeout:1500}).should("be.visible") 
		cy.url().should("include", "/verifyOtp")
	})
})



// verify otp 
describe("otp verification", () => { 
	beforeEach(() => {
		cy.visit("http://localhost:3000");
	})

  const fillRegisterForm = (username:string,passowrd:string,email:string) => { 
   		cy.get(`[data-testid="testid_username"]`).clear().type(username)
		cy.get(`[data-testid="testid_email"]`).clear().type(passowrd)
		cy.get(`[data-testid="testid_password"]`).clear().type(email)
	}


 	it("should return error toster message", () => {
		cy.contains("Sign in").click();
		cy.get(`[data-testid="DontHave_Account"]`).click() 
                 fillRegisterForm("jone","amn@gmail.com","fake_work_ma")
		cy.get(`[data-testid="Register_button"]`).should("not.be.disabled")
		cy.get(`[data-testid="Register_button"]`).click()

		cy.contains("Registration successful, now verify Otp",{timeout:1500}).should("be.visible") 
		cy.url().should("include", "/verifyOtp")

               cy.get(`[data-testid="btn_verify"]`).should("be.disabled")

		const fakeOtp = [1,2,3,4,5,6] 
		fakeOtp.forEach(num => { 
                 cy.get(`[data-testid="otp_input"]`).type(`${num}`)
	       })

               cy.get(`[data-testid="btn_verify"]`).should("not.be.disabled")
               cy.get(`[data-testid="btn_verify"]`).click()
                     
               	cy.contains("no OTP found for this email",{timeout:1500}).should("be.visible")
	})

 	it.only("should return success toster message", () => {
		cy.contains("Sign in").click();
		cy.get(`[data-testid="DontHave_Account"]`).click() 
                 fillRegisterForm("jone","fake_16@gmail.com","fake_work_ma")
		cy.get(`[data-testid="Register_button"]`).should("not.be.disabled")
		cy.get(`[data-testid="Register_button"]`).click()

		cy.contains("Registration successful, now verify Otp",{timeout:1500}).should("be.visible") 
		cy.url().should("include", "/verifyOtp")

               cy.get(`[data-testid="btn_verify"]`).should("be.disabled")

 		const fakeOtp = ["G","0","-","W","8","e"] 
		fakeOtp.forEach(num => { 
                 cy.get(`[data-testid="otp_input"]`).type(`${num}`)
	       })

               cy.get(`[data-testid="btn_verify"]`).should("not.be.disabled")
               cy.get(`[data-testid="btn_verify"]`).click()
                     
               	cy.contains("OTP verifyed successfully").should("be.visible")
	})

})


