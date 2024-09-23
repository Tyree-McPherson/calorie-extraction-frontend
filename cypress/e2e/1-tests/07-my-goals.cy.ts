/// <reference types="cypress" />

context('Add a goal and remove one', () => {
  beforeEach(() => {
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.myGoals)
    })
  })

  it('Add a goal', () => {
    cy.addGoal()
  })
  
  it('Edit a goal', () => {
    cy.addGoal()

    cy.get('button').contains('Edit Goal').click()
    cy.get('mat-label').contains('Select Percentage').click()
    cy.get('span').contains('90%').click()
    cy.get('button').contains('Save Goal').click()

    cy.get('h5').contains('90%')
  })

  it('Remove a goal', () => {
    cy.addGoal()

    cy.get('button').contains('Clear Goal').click()
    cy.get('h2').contains('0/0 Goals Completed')
  })
})
