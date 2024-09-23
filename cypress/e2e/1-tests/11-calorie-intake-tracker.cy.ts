/// <reference types="cypress" />

context('Calculate calorie intake', () => {
  it('Create a calorie intake of 82 calories per week', () => {
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.healthyFood)
    })

    cy.get('mat-label').contains('Search').type('Pineapple{enter}')
    cy.addFoodToMyMealPlan()

    cy.fixture('routes').then((routes) => {
      cy.visit(routes.calorieIntakeTracker)
    })

    cy.get('p').contains('82 calories gained')
    cy.get('h2').contains('You are projected to consume 82 calories this week')
  })
})
