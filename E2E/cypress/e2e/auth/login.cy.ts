describe("login test ", () => { 
  beforeEach(() => { 
     cy.visit("http://localhost:3000");
     cy.contains("Sign in").click();
   })


      const GetElement = (email:string, password:string) => { 
    cy.get(`[data-testid="testid_email_login"]`).clear().type(email);
    cy.get(`[data-testid="testid_password_login"]`).clear().type(password);
	} 

  it("should show button are not allowed to click", () => {
    cy.get(`[data-testid="testid_login_button"]`).should("be.disabled")
        GetElement("fake_email@gmail.com", "fake_password")

    cy.get(`[data-testid="testid_login_button"]`).should("not.be.disabled")
    cy.get(`[data-testid="testid_login_button"]`).click() 

	cy.contains("user does not exists please check you email",{timeout:1000}).should("be.visible") 
});

  it("should return password is not correct message ", () => {
    cy.get(`[data-testid="testid_login_button"]`).should("be.disabled")
        GetElement("fake@gmail.com", "fake_password")

    cy.get(`[data-testid="testid_login_button"]`).should("not.be.disabled")
    cy.get(`[data-testid="testid_login_button"]`).click() 

	cy.contains("password is not correct",{timeout:1000}).should("be.visible") 
});


  it.only("should return successfully message ", () => {
    cy.get(`[data-testid="testid_login_button"]`).should("be.disabled")
        GetElement("tekluabayneh@gmail.com", "manman")

    cy.get(`[data-testid="testid_login_button"]`).should("not.be.disabled")
    cy.get(`[data-testid="testid_login_button"]`).click() 

	cy.contains("user login successfully, now verify OTP",{timeout:1000}).should("be.visible") 
	cy.url().should("include", "verifyOtp")
       
});





});
