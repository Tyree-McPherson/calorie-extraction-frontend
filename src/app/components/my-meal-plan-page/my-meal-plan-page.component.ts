import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from "../grid/grid.component";
import { CardComponent } from '../card/card.component';
import getData from 'src/app/functions/get-collection';
import orderMealPlan from 'src/app/functions/order-meal-plan';
import updateCollection from 'src/app/functions/update-collection';
import mapNumberToWord from 'src/app/functions/map-number-to-word';
import { MatDividerModule } from '@angular/material/divider';
import getLocalData from 'src/app/functions/get-local-data';
import updateLocalData from 'src/app/functions/update-local-data';

@Component({
  selector: 'app-my-meal-plan-page',
  standalone: true,
  templateUrl: './my-meal-plan-page.component.html',
  styleUrls: ['./my-meal-plan-page.component.scss'],
  imports: [
    GridComponent,
    CardComponent,
    CommonModule,
    MatDividerModule
  ]
})
export class MyMealPlanPageComponent {

  myMealPlanRawData: any;
  myMealPlanData: any;
  useLocalMealPlanData: boolean = false;

  /**
   * On component initialization, this function is called.
   * 
   * If the user is logged out and has local data, it will use the local data.
   * Otherwise, it will get the user's meal plan from the server. It will then
   * order the days of the week, starting on Monday, and store the ordered data
   * in the myMealPlanData property. It will also store the unordered data in
   * the myMealPlanRawData property.
   */
  async ngOnInit() {

    // Check if the user has local data.
    // If so and they are logged out, use the local data.
    const localData: any = getLocalData("my_meal_plan");

    if (localData) {

      this.useLocalMealPlanData = true;
      this.myMealPlanRawData = localData;
      this.myMealPlanData = orderMealPlan(localData);

    } else {

      this.myMealPlanData = await getData("my_meal_plan");
      
      const days = this.myMealPlanData.data.json;
  
      // Order the days of the week, starting on Monday.
      this.myMealPlanRawData = days;
      this.myMealPlanData = orderMealPlan(days);
    };
  }

  /**
   * Checks if the given meal has at least one item with a name.
   * @param meal The meal to check.
   * @returns true if the meal has at least one item with a name,
   *   false otherwise.
   */
  hasMealWithName(meal: any): boolean {
    return meal.meals.some((dayMeal: any) => dayMeal.data[0]?.name);
  }

  /**
   * Removes the given item from the given meal of the given weekday.
   *
   * If the user is using local data, it will update the local data.
   * Otherwise, it will send the updated data to the server.
   * @param weekday The weekday to remove the item from.
   * @param meal The meal to remove the item from.
   * @param item The item number to remove.
   */
  async removeItem(weekday: string, meal: string, item: number) {

    // Add the items from the database.
    const documentData = {
      [weekday.toLowerCase()]: {
        ...this.myMealPlanRawData[weekday.toLowerCase()],
        [meal.toLowerCase()]: {
          ...this.myMealPlanRawData[weekday.toLowerCase()][meal.toLowerCase()],
        }
      }
    };

    // Shuffle the items down one in the array, if necessary.
    for (let i = item; i < 3; i++) {
      
      const nextItem = this.myMealPlanRawData[weekday.toLowerCase()]
        [meal.toLowerCase()][`item_${mapNumberToWord((i + 1) || 2)}`];

      if (nextItem) {
        documentData[weekday.toLowerCase()][meal.toLowerCase()]
          [`item_${mapNumberToWord(i)}`] = {
          calories: nextItem.calories,
          name: nextItem.name,
          image: nextItem.image,
          servings: nextItem.servings,
          quantity: nextItem.quantity
        };
      } else {
        documentData[weekday.toLowerCase()][meal.toLowerCase()]
          [`item_${mapNumberToWord(i)}`] = {
          calories: null,
          name: null,
          image: null,
          servings: null,
          quantity: null
        };
      };
    };

    if (this.useLocalMealPlanData) {

      updateLocalData("my_meal_plan", documentData);

    } else {

      // Send the routine data to the server.
      const updateRoutineData =
        await updateCollection("my_meal_plan", documentData);
  
      if (!updateRoutineData.success) {
        alert(updateRoutineData.data);
        return;
      };
    };

    // Reload the my meal plan page.
    window.location.reload();
  }
}