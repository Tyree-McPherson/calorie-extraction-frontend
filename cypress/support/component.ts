import './commands'
import { mount } from 'cypress/angular'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      addWorkout(): void
      addGoal(): void
      calculateBMI(
        height: string,
        heightUnit: "cm" | "inches",
        weight: string,
        weightUnit: "lbs" | "kg"
      ): void
      addFoodToMyMealPlan(): void
      signup(): void
      login(): void
    }
  }
}

Cypress.Commands.add('mount', mount)