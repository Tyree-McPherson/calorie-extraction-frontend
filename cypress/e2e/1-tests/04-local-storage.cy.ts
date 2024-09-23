/// <reference types="cypress" />

context('Create local storage', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  // Clear all localStorage, except for loggedIn.
  it('Clear all data in localStorage', () => {
    cy.clearLocalStorage()

    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('my_routine')).to.be.null
      expect(localStorage.getItem('my_goals')).to.be.null
      expect(localStorage.getItem('my_meal_plan')).to.be.null
    })

    cy.fixture('routes').then((routes) => {
      cy.visit(routes.myRoutine)
    })

    cy.fixture('routes').then((routes) => {
      cy.visit(routes.myGoals)
    })

    cy.fixture('routes').then((routes) => {
      cy.visit(routes.myMealPlan)
    })
    cy.window().its('localStorage').then((localStorage: any) => {
      cy.log(localStorage)
    })
    
    cy.fixture('local-data').then((data) => {
      cy.getAllLocalStorage().should(() => {
        expect(localStorage.getItem('my_routine')).to.eq(JSON.stringify(data.my_routine))
        expect(localStorage.getItem('my_goals')).to.eq(JSON.stringify(data.my_goals))
        expect(localStorage.getItem('my_meal_plan')).to.eq(JSON.stringify(data.my_meal_plan))
      })
    })
  })
})
