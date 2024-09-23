import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';
import updateCollection from 'src/app/functions/update-collection';
import { GridComponent } from "../grid/grid.component";
import { FilterComponent } from "../filter/filter.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CardComponent } from '../card/card.component';
import healthyFood from 'src/app/json/healthy-food.json';
import { PaginateComponent } from "../paginate/paginate.component";
import { PageEvent } from '@angular/material/paginator';
import shuffleArray from 'src/app/functions/shuffle-array';
import healthyFoodFilter from 'src/app/json/healthy-food-filter.json';
import getCollection from 'src/app/functions/get-collection';
import { AlertComponent } from "../alert/alert.component";
import { ModalComponent } from "../modal/modal.component";
import { capitalizeFirstLetter, capitalizeFirstLetterInArray }
from 'src/app/functions/capitalize-first-letter';
import { Router } from "@angular/router"
import routes from 'src/app/json/routes.json';
import getAvailableMealPlanWeekdays
from 'src/app/functions/get-available-meal-plan-weekdays';
import checkForAvailableMealPlanItems
from 'src/app/functions/check-for-available-meal-plan-items';
import getLocalData from 'src/app/functions/get-local-data';
import updateLocalData from 'src/app/functions/update-local-data';

@Component({
  selector: 'app-healthy-food-page',
  standalone: true,
  templateUrl: './healthy-food-page.component.html',
  styleUrls: ['./healthy-food-page.component.scss'],
  imports: [
    GridComponent,
    FilterComponent,
    SearchBarComponent,
    CardComponent,
    CommonModule,
    PaginateComponent,
    AlertComponent,
    ModalComponent,
    ButtonComponent,
    FormFieldComponent
  ]
})
export class HealthyFoodPageComponent {

  filterDropdownItems: string[] = healthyFoodFilter;
  allHealthyFood: any[] = healthyFood;
  healthyFood: any[] = [];
  totalItems: number = 0;
  currentFilter: string = "";
  pageSize: number = 10;
  showAlert: boolean = false;
  alertText: string = "";
  modalAvailableWeekdays: string[] = [];
  showModal: boolean = false;
  step: number = 0;
  valueWeekday: string = "";
  valueServings: string = "";
  valueMeal: string = "";
  foodObject: any = {};
  myMealPlan: any[] = [];
  useLocalMealPlanData: boolean = false;
  data: any[] = [{
    type: 'Select Servings',
    options: [1, 2, 3, 4, 5]
  }];
  capitalizeFirstLetter = capitalizeFirstLetter;
  capitalizeFirstLetterInArray = capitalizeFirstLetterInArray;

  @ViewChild(PaginateComponent) child: PaginateComponent | undefined;
  @ViewChild(FilterComponent) childFilter: FilterComponent | undefined;
  @ViewChild(SearchBarComponent) childSearch: SearchBarComponent | undefined;

  constructor(private router: Router) { }

  /**
   * This function is called when the component is initialized.
   * It shuffles the order of the healthyFood array and then
   * sets the first 10 items of the shuffled array to the
   * healthyFood property. It also sets the totalItems property
   * to the length of the shuffled array.
   * 
   * If the user is logged in, it will also get the user's meal plan
   * from local storage and store it in the myMealPlan property.
   * It will also set the useLocalMealPlanData property to true.
   */
  ngOnInit() {

    // Shuffle the order of healthyFood.
    this.allHealthyFood = shuffleArray(this.allHealthyFood);

    // Initialize the pagination. Get the first 10 items from the healthyFood.
    this.healthyFood = this.allHealthyFood.slice(0, 10);
    this.totalItems = this.allHealthyFood.length;

    const localData: any = getLocalData("my_meal_plan");

    if (localData) {
      this.useLocalMealPlanData = true;
      this.myMealPlan = localData;
    };
  }

  /**
   * Handles pagination events from the PaginateComponent.
   * 
   * When this function is called, it filters the healthyFood based on the
   * current filter. It then paginates the filtered healthyFood based on the
   * event's page index and page size.
   * @param event The PageEvent emitted by the PaginateComponent.
   */
  handlePagination(event: PageEvent) {

    this.healthyFood = this.allHealthyFood.filter(food => {
      return food.type === this.currentFilter || true
    })
      .slice(
        event.pageIndex * event.pageSize,
        event.pageIndex * event.pageSize + event.pageSize
      );
  }

  /**
   * Handles filter events from the FilterComponent.
   * 
   * When this function is called, it filters the healthyFood based on the
   * filter. If the filter is "reset", it resets the healthyFood to the
   * first 10 items. Otherwise, it filters the healthyFood based on the
   * filter and sets the first 10 of the filtered items to the component.
   * It then updates the pagination component with the new total items
   * and resets the current page index to 0.
   * @param filter The filter item selected by the user.
   */
  async setFilter(filter: string) {

    if (filter === "reset") {

      this.healthyFood = this.allHealthyFood.slice(0, this.pageSize);
      this.totalItems = this.allHealthyFood.length;
      this.currentFilter = "";
      
    } else {
      
      this.healthyFood = this.allHealthyFood
        .filter(food => food.type === filter)
        .slice(0, this.pageSize);
      this.totalItems = this.healthyFood.length;
      this.currentFilter = filter;
    };
    
    this.childSearch?.clearSearch();
    this.child?.handleFilterUpdate({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalItems
    });
  }

  /**
   * Handles search events from the SearchBarComponent.
   * 
   * When this function is called, it filters the healthyFood based on the
   * search bar's value. If the search bar is empty, it shows all the items.
   * Otherwise, it filters the healthyFood based on the search bar's value and
   * sets the first 10 of the filtered items to the component. It then
   * updates the pagination component with the new total items and resets
   * the current page index to 0.
   * @param value The search bar's value.
   */
  handleSearch(value: string) {

    // If the search bar is empty, show all the items.
    if (value === "") {
      this.healthyFood = this.allHealthyFood.slice(0, this.pageSize);
      this.totalItems = this.allHealthyFood.length;
      return;
    };

    // If the search bar is not empty, filter the items.
    this.healthyFood = this.allHealthyFood
      .filter(food => {
        return (
          food.title
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          food.type
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      })
      .slice(0, this.pageSize);
    this.totalItems = this.healthyFood.length;
    this.childFilter?.removeFilter();
    this.child?.handleFilterUpdate({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalItems
    });
  }

  /**
   * Handles the event when the user clicks the "ADD TO MY MEAL PLAN"
   * button. If the user is logged in, it will show a modal with a
   * form to select a weekday and meal. If the user is not logged in,
   * it will show a modal with a form to select a weekday only.
   * @param food The food item to add to the meal plan.
   */
  async addToMyMealPlan(food: any) {

    if (this.useLocalMealPlanData) {

      this.modalAvailableWeekdays = ["monday"];
      const availableDays = getAvailableMealPlanWeekdays(this.myMealPlan);
  
      // If the users' current routine is full, display an error message.
      if (availableDays.length === 0) {
        
        this.mealPlanFullErrorMessage(
          "Your meal plan is full. Please remove some food to add new " +
          "food and login to access all days of the week."
        );
        return;
      };

    } else {

      // Get the users' current meal plan and list all the
      // weekdays where there is available space to add the food.
      const myMealPlanData = await getCollection("my_meal_plan");
      const availableDays =
        getAvailableMealPlanWeekdays(myMealPlanData.data.json);
  
      // If the users' current meal plan is full, display an error message.
      if (availableDays.length === 0) {
        
        this.mealPlanFullErrorMessage(
          "Your meal plan is full. Please remove some food to add new food."
        );
        return;
      };
  
      this.myMealPlan = myMealPlanData.data.json;
  
      // If the users' current meal plan is not full, list all the
      // weekdays where there is available space to add the meal plan.
      this.modalAvailableWeekdays = availableDays;
    };

    this.foodObject = food;

    // Show the modal.
    this.showModal = true;
  }

  /**
   * Displays an error message to the user for 5 seconds.
   * @param errorMessage The error message to display.
   */
  mealPlanFullErrorMessage(errorMessage: string) {
    this.alertText = errorMessage;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
    return;
  }

  /**
   * Hides the modal and resets the input values.
   */
  hideModal = () => {
    this.valueWeekday = this.valueServings = this.valueMeal = ""
    this.showModal = false;
  }

  /**
   * Adds the selected food to the users' meal plan.
   * 
   * If the user is logged in, it will update the user's meal plan
   * in the server. If the user is not logged in, it will update the
   * user's meal plan in local storage.
   * 
   * If the user's meal plan is full, it will display an error message
   * to the user.
   * 
   * After adding the food to the meal plan, it will redirect to the
   * meal plan page.
   */
  async addFoodToMealPlan() {

    // Validate that a weekday, servings, and meal have been selected.
    if (this.valueWeekday === "" || this.valueServings === ""
      || this.valueMeal === "") {

      this.mealPlanFullErrorMessage(
        "You must select a weekday, servings, and meal."
      );
      return;
    };

    // Check to see if there are "items" available, based on the selected meal.
    const mealItemAvailable = checkForAvailableMealPlanItems(
      this.myMealPlan[
        this.valueWeekday.toLowerCase() as keyof typeof this.myMealPlan
      ]
      [this.valueMeal.toLowerCase() as keyof typeof this.myMealPlan]
    );

    if (!mealItemAvailable) {
      this.mealPlanFullErrorMessage(
        "There are no more items available for this meal and weekday."
      );
      return;
    };
    
    // Create the data request object.
    const documentData = {
      [this.valueWeekday.toLowerCase()]: {
        ...this.myMealPlan
          [this.valueWeekday.toLowerCase() as keyof typeof this.myMealPlan],
        [this.valueMeal.toLowerCase()]: {
          ...this.myMealPlan
            [this.valueWeekday.toLowerCase() as keyof typeof this.myMealPlan]
              [this.valueMeal.toLowerCase()],
          [mealItemAvailable]: {
            calories: this.foodObject.calories * parseInt(this.valueServings),
            image: this.foodObject.image,
            name: this.foodObject.title,
            quantity: this.valueServings,
            servings: this.foodObject.servings
          }
        },
      },
    };

    if (this.useLocalMealPlanData) {

      updateLocalData("my_meal_plan", documentData);
    
    } else {

      // Add the food to the users' meal plan.
      const updateMealPlanData =
        await updateCollection("my_meal_plan", documentData);
  
      if (!updateMealPlanData.success) {
        alert(updateMealPlanData.data);
        return;
      };
    };

    // Redirect to the meal plan page.
    this.router.navigate([routes.myMealPlan]);
  }
}