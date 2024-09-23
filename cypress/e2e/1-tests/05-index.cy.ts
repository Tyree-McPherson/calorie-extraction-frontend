/// <reference types="cypress" />

context('Test the index page functionality', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  // Ensure the nutrition section's arrows work.
  it('Checks the functionality of the nutrition section', () => {
    cy.get('.image-next').click()
    cy.get('#image-gallery-main-image')
      .should(
        'have.attr',
        'src',
        '/assets/images/calorie-intake-calculator-index.jpg'
      )
  })
  
  // Ensure subscribing to the newsletter works.
  it('Subscribes to the newsletter', () => {
    cy.get('#newsletter-email').type('name@example.com')
    cy.get('span').contains('SUBSCRIBE').click()
    cy.get('.alert-container')
      .should('contain.text', 'You have successfully subscribed')
  })
})
