/// <reference types="cypress" />

// NOTE: The serverless functions must be launched, before testing.
context('Sign up and login', () => {

  it('Sign up and login', () => {
    // cy.visit(Cypress.env('baseUrl'))
    // cy.signup()

    // NOTE:
    // Logging in does not work with Cypress as Firebase does not allow it.
    // 
    // cy.wait(10000)
    // cy.login()
  })
})
