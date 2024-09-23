import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';
import updateCollection from 'src/app/functions/update-collection';
import { GridComponent } from "../grid/grid.component";
import { FilterComponent } from "../filter/filter.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CardComponent } from '../card/card.component';
import workouts from 'src/app/json/workouts.json';
import { PaginateComponent } from "../paginate/paginate.component";
import { PageEvent } from '@angular/material/paginator';
import shuffleArray from 'src/app/functions/shuffle-array';
import workoutsFilter from 'src/app/json/workouts-filter.json';
import getCollection from 'src/app/functions/get-collection';
import { AlertComponent } from "../alert/alert.component";
import getAvailableExerciseWeekdays
from 'src/app/functions/get-available-exercise-weekdays';
import { ModalComponent } from "../modal/modal.component";
import exercises from 'src/app/json/exercises.json';
import { capitalizeFirstLetter, capitalizeFirstLetterInArray }
from 'src/app/functions/capitalize-first-letter';
import { Router } from "@angular/router"
import routes from 'src/app/json/routes.json';
import mapNumberToWord from 'src/app/functions/map-number-to-word';
import countTotalExercises from 'src/app/functions/count-total-exercises';
import orderDaysOfWeek from 'src/app/functions/order-days-of-week';
import getWeekdayAsNumber from 'src/app/functions/get-weekday-as-number';
import determineExerciseIcon from 'src/app/functions/determine-exercise-icon';
import calculateCaloriesExtracted
from 'src/app/functions/calculate-calories-extracted';
import getLocalProfileData from 'src/app/functions/get-local-profile-data';
import getLocalData from 'src/app/functions/get-local-data';
import updateLocalData from 'src/app/functions/update-local-data';


@Component({
  selector: 'app-workouts-page',
  standalone: true,
  templateUrl: './workouts-page.component.html',
  styleUrls: ['./workouts-page.component.scss'],
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
export class WorkoutsPageComponent {

  filterDropdownItems: string[] = workoutsFilter;
  allWorkouts: any[] = workouts;
  workouts: any[] = [];
  totalItems: number = 0;
  currentFilter: string = "";
  pageSize: number = 10;
  showAlert: boolean = false;
  alertText: string = "";
  modalAvailableWeekdays: string[] = [];
  showModal: boolean = false;
  step: number = 0;
  value: string = "";
  valueWeekday: string = "";
  exerciseTitle: string = "";
  myRoutine: any[] = [];
  data: any[] = [{
    type: 'Select Duration',
    options: exercises.durations
  }];
  useLocalRoutineData: boolean = false;
  capitalizeFirstLetter = capitalizeFirstLetter;
  capitalizeFirstLetterInArray = capitalizeFirstLetterInArray;

  @ViewChild(PaginateComponent) child: PaginateComponent | undefined;
  @ViewChild(FilterComponent) childFilter: FilterComponent | undefined;
  @ViewChild(SearchBarComponent) childSearch: SearchBarComponent | undefined;

  constructor(private router: Router) { }

  /**
   * Lifecycle hook that is called when the component is initialized.
   * 
   * It shuffles the order of the workouts and then sets the first 10 items
   * of the shuffled array to the workouts property. It also sets the
   * totalItems property to the length of the shuffled array.
   * 
   * If the user is logged in, it will also get the user's routine from local
   * storage and store it in the myRoutine property. It will also set the
   * useLocalRoutineData property to true.
   */
  ngOnInit() {

    // Shuffle the order of workouts.
    this.allWorkouts = shuffleArray(this.allWorkouts);

    // Initialize the pagination. Get the first 10 items from the workouts.
    this.workouts = this.allWorkouts.slice(0, 10);
    this.totalItems = this.allWorkouts.length;

    const localData: any = getLocalData("my_routine");

    if (localData) this.useLocalRoutineData = true;
  }

  /**
   * Handles pagination events from the PaginateComponent.
   * 
   * When this function is called, it filters the allWorkouts array
   * based on the current filter. It then paginates the filtered
   * allWorkouts array based on the event's page index and page size.
   * @param event The PageEvent emitted by the PaginateComponent.
   */
  handlePagination(event: PageEvent) {

    this.workouts = this.allWorkouts.filter(workout => {
      return workout.type === this.currentFilter || true
    })
      .slice(
        event.pageIndex * event.pageSize,
        event.pageIndex * event.pageSize + event.pageSize
      );
  }

  /**
   * Handles filter events from the FilterComponent.
   * 
   * When this function is called, it filters the allWorkouts array
   * based on the filter. If the filter is "reset", it resets the allWorkouts
   * to the first 10 items. Otherwise, it filters the allWorkouts based on the
   * filter and sets the first 10 of the filtered items to the component.
   * It then updates the pagination component with the new total items
   * and resets the current page index to 0.
   * @param filter The filter item selected by the user.
   */
  async setFilter(filter: string) {

    if (filter === "reset") {

      this.workouts = this.allWorkouts.slice(0, this.pageSize);
      this.totalItems = this.allWorkouts.length;
      this.currentFilter = "";
      
    } else {
      
      this.workouts = this.allWorkouts
        .filter(workout => workout.type === filter)
        .slice(0, this.pageSize);
      this.totalItems = this.workouts.length;
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
   * When this function is called, it filters the allWorkouts array
   * based on the search bar's value. If the search bar is empty, it shows
   * all the items. Otherwise, it filters the allWorkouts based on the
   * search bar's value and sets the first 10 of the filtered items to
   * the component. It then updates the pagination component with the
   * new total items and resets the current page index to 0.
   * @param {string} value The search bar's value.
   */
  handleSearch(value: string) {

    // If the search bar is empty, show all the items.
    if (value === "") {
      this.workouts = this.allWorkouts.slice(0, this.pageSize);
      this.totalItems = this.allWorkouts.length;
      return;
    };

    // If the search bar is not empty, filter the items.
    this.workouts = this.allWorkouts
      .filter(workout => {
        return (
          workout.title
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          workout.description
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      })
      .slice(0, this.pageSize);
    this.totalItems = this.workouts.length;
    this.childFilter?.removeFilter();
    this.child?.handleFilterUpdate({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalItems
    });
  }

  /**
   * Adds an exercise to the user's routine.
   * 
   * @param {string} exercise The exercise to add to the user's routine.
   * 
   * If the user is logged in, it first checks if the user's routine is full.
   * If it is, it displays an error message. Otherwise, it displays a modal
   * with the available weekdays to add the exercise to. If the user is not
   * logged in, it only allows adding the exercise to Monday.
   * 
   * After displaying the modal, it shows the first step of the three-step
   * form.
   */
  async addToMyRoutine(exercise: string) {

    this.exerciseTitle = exercise;

    if (this.useLocalRoutineData) {

      const localData: any = getLocalData("my_routine");
      this.myRoutine = localData;
      this.modalAvailableWeekdays = ["monday"];
      const availableDays =
        getAvailableExerciseWeekdays(localData);
  
      // If the users' current routine is full, display an error message.
      if (availableDays.length === 0) {
        
        this.routineFullErrorMessage(
          "Your routine is full. Please remove some exercises to add more " +
          "and login to access all days of the week."
        );
        return;
      };
      
    } else {

      // Get the users' current routine and list all the
      // weekdays where there is available space to add the exercise.
      const myRoutineData = await getCollection("my_routine");
      const availableDays =
        getAvailableExerciseWeekdays(myRoutineData.data.json);
  
      // If the users' current routine is full, display an error message.
      if (availableDays.length === 0) {
        
        this.routineFullErrorMessage(
          "Your routine is full. Please remove some exercises to add more."
        );
        return;
      };
      
      this.myRoutine = myRoutineData.data.json;
  
      // If the users' current routine is not full, list all the
      // weekdays where there is available space to add the routine.
      this.modalAvailableWeekdays = availableDays;
    };

    // Show the modal.
    this.showModal = true;
  }

  /**
   * Displays an error message to the user for 5 seconds.
   * @param {string} errorMessage The error message to display.
   */
  routineFullErrorMessage(errorMessage: string) {
    this.alertText = errorMessage;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
    return;
  }

  /**
   * Hides the modal.
   */
  hideModal = () => {
    this.valueWeekday = this.value = ""
    this.showModal = false;
  }

  /**
   * Adds an exercise to the users' routine.
   * 
   * If the user has not selected a weekday and duration, the function
   * displays an error message. The function then gets the next available
   * exercise for the weekday. It then creates the data request object and
   * updates the users' local data or sends the data to the server if the
   * user is logged in.
   * 
   * If the update is successful, the function redirects to the routine
   * page.
   */
  async addExerciseToRoutine() {

    // Validate that a weekday and duration have been selected.
    if (this.valueWeekday === "" || this.value === "") {
      this.alertText =
        "You must select a weekday and duration";
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
      return;
    }
    
    // Get the next available exercise for the weekday.
    let exerciseNumberToWord: any = mapNumberToWord(
      countTotalExercises(
        (orderDaysOfWeek(this.myRoutine)
        [getWeekdayAsNumber(this.valueWeekday)] as { exercises: any })
          .exercises
      )
    );
    
    // Create the data request object.
    const documentData = {
      [this.valueWeekday.toLowerCase()]: {
        ...this.myRoutine
          [this.valueWeekday.toLowerCase() as keyof typeof this.myRoutine],
        [`exercise_${exerciseNumberToWord}`]: {
          type: determineExerciseIcon("exercise"),
          description: this.exerciseTitle,
          duration: this.value,
          calories: calculateCaloriesExtracted(
            this.exerciseTitle,
            parseInt(this.value),
            getLocalProfileData()?.weight?.weight || 0
          )
        },
      },
    };

    if (this.useLocalRoutineData) {
      updateLocalData("my_routine", documentData);
    
    } else {

      // Add the exercise to the users' routine.
      const updateRoutineData =
        await updateCollection("my_routine", documentData);
  
      if (!updateRoutineData.success) {
        alert(updateRoutineData.data);
        return;
      };
    };

    // Redirect to the routine page.
    this.router.navigate([routes.myRoutine]);
  }
}