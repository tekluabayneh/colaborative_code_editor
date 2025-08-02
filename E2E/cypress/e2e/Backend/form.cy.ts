/// <referance types="cypress"/>

import { method } from "cypress/types/bluebird"


describe("Get form data", () => {
it("request register to reg api and get successfully message", () => {
  cy.request("http://localhost:500/api/auth/register", {method:"Post"}).then(res => {
   cy.log(res.body) 
  })
})


})
