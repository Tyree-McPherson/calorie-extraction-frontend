/// <reference types="cypress" />

context('Calculate Body Mass Index', () => {
  beforeEach(() => {
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.bodyMassIndexCalculator)
    })
  })

  it('Create a BMI of underweight', () => {
    cy.calculateBMI('150', 'cm', '90', 'lbs')
    cy.get('p').contains('Your BMI is considered underweight')
  })

  it('Create a BMI of obese', () => {
    cy.calculateBMI('66', 'inches', '85', 'kg')
    cy.get('p').contains('Your BMI is considered obese')
  })
})
