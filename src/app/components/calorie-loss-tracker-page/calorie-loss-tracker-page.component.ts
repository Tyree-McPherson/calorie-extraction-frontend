import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import getWeekday from 'src/app/functions/get-weekday';
import getData from 'src/app/functions/get-collection';
import getLocalProfileData from 'src/app/functions/get-local-profile-data';
import { CalorieGainLossComponent }
from '../calorie-gain-loss/calorie-gain-loss.component';
import convertBirthdayToAge from 'src/app/functions/convert-birthday-to-age';
import calculateCalorieGainLoss
from 'src/app/functions/calculate-calorie-gain-loss';
import { MatDividerModule } from '@angular/material/divider';
import calculateBmr from 'src/app/functions/calculate-bmr';
import getWeekdayAsNumber from 'src/app/functions/get-weekday-as-number';
import getLocalData from 'src/app/functions/get-local-data';
import isLoggedIn from 'src/app/functions/is-logged-in';

@Component({
  selector: 'app-calorie-loss-tracker-page',
  standalone: true,
  templateUrl: './calorie-loss-tracker-page.component.html',
  styleUrls: ['./calorie-loss-tracker-page.component.scss'],
  imports: [
    CommonModule,
    CalorieGainLossComponent,
    MatDividerModule
  ]
})
export class CalorieLossTrackerPageComponent {

  projectedCalories: string = "0";
  myMealPlanData: any;
  myRoutineData: any;
  caloriesLost: number[] = [];
  caloriesGained: number[] = [];
  weekday: string = getWeekday();
  profileData: any = getLocalProfileData();
  bmr: string = "";
  age: string = "";
  projectedCaloriesGainLoss: "gain" | "lose" = "gain";

  /**
   * On component initialization, this function is called.
   * It will either get the user's meal plan and routine from local storage
   * or from the server, depending on whether the user is logged in.
   * It will then calculate the projected daily calorie gain or loss
   * based on the user's meal plan and routine, and store that value
   * in the projectedCalories property.
   */
  async ngOnInit() {

    const userLoggedIn = isLoggedIn();
    let weekdayAsNumber;

    if (!userLoggedIn) {
      
      this.myMealPlanData = getLocalData("my_meal_plan");
      this.myRoutineData = getLocalData("my_routine");
      weekdayAsNumber = 0;
      this.weekday = "Monday";
      
    } else {
      
      this.myMealPlanData = (await getData("my_meal_plan")).data.json;
      this.myRoutineData = (await getData("my_routine")).data.json;
      weekdayAsNumber = getWeekdayAsNumber(getWeekday());
    };

    if (this.profileData?.age?.birthday) {
      this.age = convertBirthdayToAge(this.profileData.age.birthday);
    };

    this.caloriesLost = calculateCalorieGainLoss(this.myRoutineData);
    this.caloriesGained =
      calculateCalorieGainLoss(this.myMealPlanData);
    this.bmr = calculateBmr(
      this.profileData?.height?.height,
      this.profileData?.weight?.weight,
      this.age, this.profileData?.gender?.gender
    ).toLocaleString();

    this.projectedCalories =
      this.calculateSum(
        this.caloriesGained[weekdayAsNumber],
        this.caloriesLost[weekdayAsNumber]
      ).toLocaleString();
  }

  /**
   * Calculates the final calorie gain/loss by subtracting the BMR from the
   * difference between the sum to add and the sum to subtract.
   *
   * If the final sum is negative, the projectedCaloriesGainLoss variable is
   * set to "lose".
   *
   * @param {number} sumToAdd the sum to add
   * @param {number} sumToSubtract the sum to subtract
   * @returns {number} the final calorie gain/loss
   */
  calculateSum(sumToAdd: number, sumToSubtract: number): number {
    
    // Calculate the final calorie gain/loss.
    const finalSum = (sumToAdd - sumToSubtract) - parseInt(this.bmr);

    if (finalSum < 0) this.projectedCaloriesGainLoss = "lose";
    
    return Math.abs(finalSum);
  }
}