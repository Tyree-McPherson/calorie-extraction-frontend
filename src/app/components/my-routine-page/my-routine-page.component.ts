import { ChangeDetectorRef, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { CommonModule } from '@angular/common';
import { ProfileBoxComponent } from '../profile-box/profile-box.component';
import { GridComponent } from "../grid/grid.component";
import getData from 'src/app/functions/get-collection';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalComponent } from "../modal/modal.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormFieldComponent } from '../form-field/form-field.component';
import updateCollection from 'src/app/functions/update-collection';
import getWeekday from 'src/app/functions/get-weekday';
import orderDaysOfWeek from 'src/app/functions/order-days-of-week';
import { BoxItemComponent } from "../box-item/box-item.component";
import getWeekdayAsNumber from 'src/app/functions/get-weekday-as-number';
import exercises from 'src/app/json/exercises.json';
import countTotalExercises from 'src/app/functions/count-total-exercises';
import calculateCaloriesExtracted
from 'src/app/functions/calculate-calories-extracted';
import getLocalProfileData from 'src/app/functions/get-local-profile-data';
import determineExerciseIcon from 'src/app/functions/determine-exercise-icon';
import getLocalData from 'src/app/functions/get-local-data';
import updateLocalData from 'src/app/functions/update-local-data';

@Component({
  selector: 'app-my-routine-page',
  standalone: true,
  templateUrl: './my-routine-page.component.html',
  styleUrls: ['./my-routine-page.component.scss'],
  imports: [
    ProfileBoxComponent,
    GridComponent,
    MatIconModule,
    MatTooltipModule,
    ModalComponent,
    ButtonComponent,
    InputFieldComponent,
    MatFormFieldModule,
    CommonModule,
    FormFieldComponent,
    BoxItemComponent
  ]
})
export class MyRoutinePageComponent {

  showModal = false;
  weekday = "";
  routineData: any;
  dayEdit = "";
  weekdayAsNumber = 0;
  exercises: any = exercises;
  exerciseType: string = "";
  exerciseDescription: string = "";
  exerciseDuration: string = "";
  exerciseEditValue: string = "";
  step: number = 0;
  editWeekdayExercises: any = [];
  newExercises: any = {};
  value: string = "";
  profileData: any = getLocalProfileData();
  data: any[] = [{
    type: 'Select Type',
    options: exercises.types
  },
  {
    type: 'Select Description',
    // @ts-ignore
    options: exercises.descriptions[this.exerciseType]
  },
  {
    type: 'Select Duration',
    options: exercises.durations
  }];
  totalExercisesForWeekday: number = 0;
  useLocalRoutineData: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  /**
   * This lifecycle hook is called after the component's data-bound properties
   * have been initialized. The function first gets the weekday using the
   * getWeekday() function. It then checks if the user has local data. If so
   * and the user is logged out, the function uses the local data. The function
   * then gets the routine data from the server. It then orders the days of the
   * week, starting on Monday. Finally, the function calculates the total
   * exercises for the weekday.
   */
  async ngOnInit(): Promise<void> {

    this.weekday = getWeekday();

    // Check if the user has local data.
    // If so and they are logged out, use the local data.
    const localData: any = getLocalData("my_routine");

    if (localData) {
      this.useLocalRoutineData = true;
      const exercisesArray = [{
        exercises: [
          localData.monday.exercise_one,
          localData.monday.exercise_two,
          localData.monday.exercise_three,
          localData.monday.exercise_four
        ],
        weekday: "Monday"
      }];

      // To prevent binding issues when editing a routine.
      const exercisesArrayDisplay = [{
        exercises: [
          localData.monday.exercise_one,
          localData.monday.exercise_two,
          localData.monday.exercise_three,
          localData.monday.exercise_four
        ],
        weekday: "Monday"
      }];
      this.editWeekdayExercises = this.newExercises = exercisesArray;
      this.routineData = exercisesArrayDisplay;
      this.totalExercisesForWeekday = countTotalExercises(
        this.editWeekdayExercises[this.weekdayAsNumber].exercises
      );
      return;
    };

    this.routineData = await getData("my_routine");

    const days = this.routineData.data.json;

    // Order the days of the week, starting on Monday.
    this.editWeekdayExercises = this.newExercises = orderDaysOfWeek(days);
    this.routineData = orderDaysOfWeek(this.routineData.data.json);
    this.totalExercisesForWeekday = countTotalExercises(
      this.editWeekdayExercises[this.weekdayAsNumber].exercises
    );
  }

  /**
   * Handles the selection change event in the three-step form.
   * There are three steps in the form:
   * 1. Select the exercise type.
   * 2. Select the exercise description.
   * 3. Select the exercise duration.
   * For each step, the function updates the state of the component and
   * the exercises array.
   * @param selectedValue The value of the selected item.
   */
  handleSelectionChange(selectedValue: string) {
    switch(this.step) {
      case 0:
        this.exerciseType = selectedValue.toLowerCase();
        this.step++;
        this.data[1] = {
          type: 'Select Description',
          // @ts-ignore
          options: exercises.descriptions[this.exerciseType]
        }
        break;
      case 1:
        this.exerciseDescription = selectedValue;
        this.step++;
        break;
      case 2:
        this.exerciseDuration = selectedValue;
        
        const totalExercises = countTotalExercises(
          this.editWeekdayExercises[this.weekdayAsNumber].exercises
        );

        // Save the three-step form field into a static item.
        this.editWeekdayExercises[this.weekdayAsNumber]
          .exercises[totalExercises] =
        this.newExercises[this.weekdayAsNumber].exercises[totalExercises] = {
          type: determineExerciseIcon(this.exerciseType),
          description: this.exerciseDescription,
          duration: this.exerciseDuration,
          calories: calculateCaloriesExtracted(
            this.exerciseDescription,
            parseInt(this.exerciseDuration),
            this.profileData.weight.weight
          )
        };

        // Get the total exercises.
        this.totalExercisesForWeekday = totalExercises + 1;
          
          // Check to see if more exercises can be added.
        if (this.totalExercisesForWeekday !== 4) this.resetEdit();
        break;
    };
  }

  /**
   * Resets the state of the component, used after adding a new exercise to
   * the users' routine.
   */
  resetEdit() {
    this.step = 0;
    this.exerciseType = "";
    this.exerciseDescription = "";
    this.exerciseDuration = "";
    this.value = "";
    this.cdr.detectChanges();
  }

  /**
   * Toggles the modal for editing a users' routine.
   * @param weekday the weekday to edit.
   */
  toggleModal(weekday: string) {
    this.dayEdit = weekday;
    this.weekdayAsNumber = getWeekdayAsNumber(weekday);
    this.showModal = !this.showModal;
  }

  /**
   * Hides the modal and resets the state of the component.
   */
  hideModal = () => {
    this.showModal = false;
    this.dayEdit = "";
    this.resetEdit();
  }

  /**
   * Removes the last exercise from the users' routine.
   * The function is called when the user clicks the "REMOVE LAST EXERCISE"
   * button in the modal. The function decrements the total exercises for the
   * weekday and sets the exercise at the total exercises index to null.
   */
  removeExercise() {
    this.totalExercisesForWeekday--;
    this.editWeekdayExercises[this.weekdayAsNumber]
      .exercises[this.totalExercisesForWeekday] = {
      type: null,
      description: null,
      duration: null,
      calories: null
    };
  }

  /**
   * Confirms the edit of the users' routine. The function sends the users'
   * edited routine to the server and updates the local storage if the user
   * is not logged in. If the update is successful, the function reloads the
   * profile page.
   */
  async confirmEdit() {

    // Construct the object that reflects the document in Firebase and locally.
    const documentData = {
      [this.dayEdit.toLowerCase()]: {
        "exercise_one": {
          ...this.newExercises[this.weekdayAsNumber].exercises[0]
        },
        "exercise_two": {
          ...this.newExercises[this.weekdayAsNumber].exercises[1]
        },
        "exercise_three": {
          ...this.newExercises[this.weekdayAsNumber].exercises[2]
        },
        "exercise_four": {
          ...this.newExercises[this.weekdayAsNumber].exercises[3]
        }
      }
    };

    // If the user is not logged in, update the local storage.
    if (this.useLocalRoutineData) {

      updateLocalData("my_routine", documentData);

    } else {

      // Send the routine data to the server.
      const updateRoutineData =
        await updateCollection("my_routine", documentData);
  
      if (!updateRoutineData.success) {
        alert(updateRoutineData.data);
        return;
      };
    };

    // After a successful edit, reload the profile page.
    window.location.reload();
  }
}
