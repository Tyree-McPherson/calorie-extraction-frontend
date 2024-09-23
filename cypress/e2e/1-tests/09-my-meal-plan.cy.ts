/// <reference types="cypress" />

context('Add ', () => {
  beforeEach(() => {
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.healthyFood)
    })
  })

  it('Add food to my meal plan', () => {
    cy.addFoodToMyMealPlan()
  })

  it('Remove food from my meal plan', () => {
    cy.addFoodToMyMealPlan()
    cy.get('span').contains('REMOVE').click()
    cy.get('p').contains('No meal plan on Monday')
  })
})
