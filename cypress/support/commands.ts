/// <reference types="cypress" />

Cypress.Commands.add('addWorkout', () => {
  cy.get('span').contains('ADD TO MY ROUTINE').click()

  cy.get('#select-weekday-form-field').click()
  cy.get('#mat-option-0').click()
  
  cy.get('#add-exercise-form-field').click()
  cy.get('#mat-option-1').click()

  cy.get('span').contains('Confirm').click()
})

Cypress.Commands.add('addGoal', () => {
  cy.get('button').contains('Add Goal').click()
  cy.get('mat-label').contains('Select Type').click()
  cy.get('span').contains('Weight loss').click()
  
  cy.get('mat-label').contains('Select Description').click()
  cy.get('span').contains('Lose 20 pounds').click()

  cy.get('mat-label').contains('Select Percentage').click()
  cy.get('span').contains('30%').click()

  cy.get('button').contains('Save Goal').click()
})

Cypress.Commands.add('calculateBMI', (
  height: string,
  heightUnit: "cm" | "inches",
  weight: string,
  weightUnit: "lbs" | "kg"
) => {
  cy.get('mat-label').contains('Height').type(height)
  cy.get('#height-select-field').click()
  cy.get('span').contains(heightUnit).click()

  cy.get('mat-label').contains('Weight').type(weight)
  cy.get('#weight-select-field').click()
  cy.get('span').contains(weightUnit).click()

  cy.get('span').contains('Calculate').click()
})

Cypress.Commands.add('addFoodToMyMealPlan', () => {
  cy.get('span').contains('ADD TO MY MEAL PLAN').click()
  cy.get('mat-label').contains('Select Weekday').click()
  cy.get('span').contains('Monday').click()

  cy.get('mat-label').contains('Select Servings').click()
  cy.get('span').contains('1').click()

  cy.get('mat-label').contains('Select Meal').click()
  cy.get('span').contains('Breakfast').click()

  cy.get('span').contains('Confirm').click()
})

Cypress.Commands.add('signup', () => {
  cy.fixture('user').then((user) => {
    cy.get('span').contains('Sign Up').click()
    cy.get('#signup-email').type(user.email)
    cy.get('#signup-password').type(user.password)
    cy.get('#signup-confirm-password').type(user.password)
    cy.get('span').contains(' Sign Up ').click()
  })
})

Cypress.Commands.add('login', () => {
  cy.fixture('user').then((user) => {
    cy.get('#login-email').type(user.email)
    cy.get('#login-password').type(user.password)
    cy.get('span').contains(' Login ').click()
  })
})
