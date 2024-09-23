/// <reference types="cypress" />

context('Ensure workouts can be added and removed', () => {
  beforeEach(() => {
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.workouts)
    })
  })

  it('Filter a workout', () => {
    cy.get('.filter-heading').click()
    cy.get('#filter-dropdown-item-0').click()
    cy.get('app-card').its('length').should('eq', 5);
  })

  it('Search for a workout', () => {
    cy.get('#search-bar').type('lunges').type('{enter}')
    cy.get('.mat-mdc-card-image')
      .should(
        'have.attr',
        'src',
        '/assets/images/workouts/lunges.jpg'
      )
  })

  it('Go to the next page', () => {
    cy.get('.mat-mdc-paginator-navigation-next').click()
    cy.get('app-card').its('length').should('eq', 7);
  })

  it('Add a workout', () => {
    cy.addWorkout()
  })

  it('Add and remove a workout from the my-routine page', () => {
    cy.fixture('routes').then((routes) => {
      cy.visit(routes.myRoutine)
    })

    cy.get('mat-icon').contains('edit').click()
    cy.get('mat-label').contains('Select Type').click()
    cy.get('mat-option').contains('Exercise').click()
    
    cy.get('mat-label').contains('Select Description').click()
    cy.get('mat-option').contains('Push-Ups').click()

    cy.get('mat-label').contains('Select Duration').click()
    cy.get('mat-option').contains('2m').click()

    cy.get('span').contains('Confirm').click()

    cy.get('mat-icon').contains('edit').click()
    cy.get('button').contains('REMOVE LAST EXERCISE').click()
    cy.get('span').contains('Confirm').click()
  })
})