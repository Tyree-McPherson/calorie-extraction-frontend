/// <reference types="cypress" />

context('Calculate calorie loss', () => {
  it('should have a title', () => {
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.healthyFood)
    })
    cy.get('mat-label').contains('Search').type('Pineapple{enter}')
    cy.addFoodToMyMealPlan()
    
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.workouts)
    })
    cy.get('mat-label').contains('Search').type('Speed Walking{enter}')
    cy.addWorkout()
    
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.calorieLossTracker)
    })

    cy.get('h2').contains('You are projected to gain 72 calories on Monday')
    cy.get('p').contains('10 calories lost')
    cy.get('p').contains('82 calories gained')
  })
})
