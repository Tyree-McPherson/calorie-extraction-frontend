/// <reference types="cypress" />

context('Ensure the footer has the correct links', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  it('should have all the footer links', () => {
    cy.get('a').contains('FAQ')
    cy.get('a').contains('About')
    cy.get('a').contains('Contact')
    cy.get('a').contains('Terms of Use')
    cy.get('a').contains('Privacy Policy')
  })
})
