import { Component } from '@angular/core';
import getData from 'src/app/functions/get-collection';
import { CalorieGainLossComponent }
from '../calorie-gain-loss/calorie-gain-loss.component';
import calculateCalorieGainLoss
from 'src/app/functions/calculate-calorie-gain-loss';
import getLocalData from 'src/app/functions/get-local-data';
import isLoggedIn from 'src/app/functions/is-logged-in';

@Component({
  selector: 'app-calorie-intake-tracker-page',
  standalone: true,
  templateUrl: './calorie-intake-tracker-page.component.html',
  styleUrls: ['./calorie-intake-tracker-page.component.scss'],
  imports: [CalorieGainLossComponent]
})
export class CalorieIntakeTrackerPageComponent {

  projectedCalories: string = "0";
  myMealPlanData: any;
  caloriesGained: number[] = [];

  /**
   * On component initialization, this function is called.
   * It will either get the user's meal plan from local storage
   * or from the server, depending on whether the user is logged in.
   * It will then calculate the projected daily calorie gain
   * based on the user's meal plan, and store that value
   * in the projectedCalories property.
   */
  async ngOnInit() {

    const userLoggedIn = isLoggedIn();

    if (!userLoggedIn) {
      
      this.myMealPlanData = getLocalData("my_meal_plan");
    
    } else {
      
      this.myMealPlanData = (await getData("my_meal_plan")).data.json;
    };

    this.caloriesGained =
      calculateCalorieGainLoss(this.myMealPlanData);
    this.projectedCalories = this.calculateSum(this.caloriesGained)
      .toLocaleString();
  }

  /**
   * This function takes an array of numbers and returns the sum of all the
   * values in the array. It uses the Array.reduce() method to do this.
   * @param addArray the array of numbers to be summed
   * @returns the sum of all the values in the array
   */
  calculateSum(addArray: number[]): number {
    return addArray.reduce((acc, value) => acc + value, 0);
  }
}