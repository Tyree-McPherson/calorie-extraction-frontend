/// <reference types="cypress" />

context('Header links, buttons, and functionality', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  it('should have a title', () => {
    cy.title().should('eq', 'Home - Calorie Extraction')
  })

  it('should have 3 h4 tags', () => {
    cy.get('h4').should('contain.text', 'Fitness')
    cy.get('h4').should('contain.text', 'Wellness')
    cy.get('h4').should('contain.text', 'Nutrition')
  })

  it('should have a login and signup button', () => {
    cy.get('span').should('contain.text', 'Login')
    cy.get('span').should('contain.text', 'Sign Up')
  })

  it('Should have a hamburger menu', () => {
    cy.viewport(700, 660);
    cy.get('mat-icon').should('contain.text', 'menu')
    cy.viewport(1000, 660);
  })

  it('Should display a login modal', () => {
    cy.get('span').contains('Login').click()
    cy.get('h2').should('contain.text', 'Login')
  })
  
  it('Should display a sign up modal', () => {
    cy.get('span').contains('Sign Up').click()
    cy.get('h2').should('contain.text', 'Sign Up')
  })
})
