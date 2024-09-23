import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import getData from 'src/app/functions/get-collection';
import { FormFieldComponent } from '../form-field/form-field.component';
import updateCollection from 'src/app/functions/update-collection';
import { MatButtonModule } from '@angular/material/button';
import mapNumberToWord from 'src/app/functions/map-number-to-word';
import goals from 'src/app/json/goals.json';
import mapGoalToIcon from 'src/app/functions/map-goal-to-icon';
import orderGoals from 'src/app/functions/order-goals';
import { GoalItemComponent } from "../goal-item/goal-item.component";
import getLocalData from 'src/app/functions/get-local-data';
import updateLocalData from 'src/app/functions/update-local-data';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-my-goals-page',
  standalone: true,
  templateUrl: './my-goals-page.component.html',
  styleUrls: ['./my-goals-page.component.scss'],
  imports: [
    MatIconModule,
    CommonModule,
    ButtonComponent,
    MatButtonModule,
    FormFieldComponent,
    GoalItemComponent,
    AlertComponent
]
})
export class MyGoalsPageComponent {

  goalData: any;
  totalGoals: number = 0;
  completedGoals: number = 0;
  editGoalIsActive: boolean = false;
  editExistingGoalIsActive: boolean = false;
  editGoalIndex: number = 0;
  value: string = "";
  step: number = 0;
  goalType: string = "";
  goalDescription: string = "";
  goalPercentage: string = "";
  goalNumberAsWord: string = "";
  showAlert: boolean = false;
  alertText: string = "";
  data: any[] = [{
    type: 'Select Type',
    options: goals.types
  },
  {
    type: 'Select Description',
    options: goals.descriptions
  },
  {
    type: 'Select Percentage',
    options: goals.percentages
  }];
  useLocalGoalData: boolean = false;

  /**
   * Initializes the component after Angular first displays the data-bound
   * properties and sets the directive or component's input properties.
   *
   * This function checks if the user is logged in. If so, get their profile
   * data and if they entered their goals, auto fills them in.
   *
   * @return {Promise<void>} A promise that resolves when the function is
   * completed.
   */
  async ngOnInit(): Promise<void> {

    // Check if the user has local data.
    // If so and they are logged out, use the local data.
    const localData: any = getLocalData("my_goals");

    if (localData) {
      this.useLocalGoalData = true;
      this.goalData = [ localData.goal_one ];

    } else {

      this.goalData = await getData("my_goals");
      this.goalData = orderGoals(this.goalData.data.json);
    };

    this.totalGoals = this.goalData
      .filter((goal: { type: string; }) => goal.type).length;
    this.completedGoals = this.goalData
      .filter(
        (goal: { percentage: string; }) => goal.percentage === "100"
      ).length;
  }

  /**
   * Handles the selection change event from the three-step form.
   *
   * @param selectedValue The selected value from the form.
   *
   * @return {void}
   */
  handleSelectionChange(selectedValue: string): void {
    switch(this.step) {
      case 0:
        this.goalType = selectedValue;
        this.step++;
        break;
      case 1:
        this.goalDescription = selectedValue;
        this.step++;
        break;
      case 2:
        this.goalPercentage = selectedValue;
        this.goalNumberAsWord = mapNumberToWord(this.totalGoals);
        break;
    };
  }

  /**
   * Handles the selection change event for the percentage form field.
   *
   * @param selectedValue The selected percentage.
   *
   * @return {void}
   */
  handlePercentageSelectionChange(selectedValue: string): void {
    this.goalPercentage = selectedValue;
  }

  /**
   * Resets the state of the component after the user has either
   * confirmed a new goal or discarded their changes.
   *
   * @return {void}
   */
  resetEdit(): void {
    this.goalType = "";
    this.goalDescription = "";
    this.goalPercentage = "";
    this.step = 0;
    this.editExistingGoalIsActive = false;
  }

  /**
   * Discards any unsaved changes the user may have made to the goal that is
   * currently being edited.
   *
   * @return {void}
   */
  discardChanges(): void {
    this.editGoalIsActive = false;
    this.resetEdit();
  }

  /**
   * Puts the component into "add new goal" mode. This method is called when
   * the user clicks the "Add Goal" button.
   *
   * @return {void}
   */
  addGoal(): void {
    this.editGoalIsActive = true;
  }

  /**
   * Puts the component into "edit existing goal" mode. This method is called
   * when the user clicks the "Edit Goal" button.
   *
   * @param {number} index The index of the goal to edit.
   *
   * @return {void}
   */
  editGoal(index: number): void {
    this.editGoalIndex = index;
    this.goalType = this.goalData[index].type;
    this.goalDescription = this.goalData[index].description;
    this.goalNumberAsWord = mapNumberToWord(index);
    this.editExistingGoalIsActive = true;
  }

  /**
   * Removes a goal at a given index. This method is called when the user
   * clicks the "Clear Goal" button.
   *
   * @param {number} index The index of the goal to remove.
   *
   * @return {void}
   */
  removeGoal(index: number): void {
    this.goalNumberAsWord = mapNumberToWord(index);
    this.confirmNewGoal(index, true);
  }

  /**
   * Confirms a new goal and updates the user's goals data in Firebase or
   * locally. This method is called when the user clicks the "Save Goal"
   * button.
   *
   * If a goal is being removed, this method moves all subsequent goals down
   * by 1.
   *
   * @param {number} index The index of the goal to confirm.
   * @param {boolean} removeGoal Whether the goal is being removed or not.
   * Defaults to false.
   *
   * @return {Promise<void>} A promise that resolves when the function is
   * completed.
   */
  async confirmNewGoal(
    index: number,
    removeGoal: boolean = false
  ): Promise<void> {

    // Data validation to see if a type, description,
    // and percentage are selected.
    if (!removeGoal && (!this.goalType || !this.goalDescription
      || !this.goalPercentage)) {

      this.alertText =
        "You must select a goal, a description, and a percentage.";
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 5000);

      return;
    };

    // Construct the object that reflects the document in Firebase or locally.
    const documentData = {
      [`goal_${this.goalNumberAsWord}`]: {
        type: this.editExistingGoalIsActive ? this.goalType :
          mapGoalToIcon(this.goalType) || null,
        description: this.goalDescription || null,
        percentage: this.goalPercentage.replace("%", "") || null
      }
    };
    
    // If a goal is being removed, move all subsequent goals down by 1.
    if (removeGoal) {
      for (let i = index; i < 5; i++) {
        
        const nextGoal = i + 1;
        const nextItem = this.goalData[nextGoal] || null;

        if (nextItem) {
          documentData[`goal_${mapNumberToWord(i)}`] = {
            type: nextItem.type,
            description: nextItem.description,
            percentage: nextItem.percentage
          };
        } else {
          documentData[`goal_${mapNumberToWord(i)}`] = {
            type: null,
            description: null,
            percentage: null
          };
        };
      };
    };

    if (this.useLocalGoalData) {

      updateLocalData("my_goals", documentData);

    } else {

      // Send the goals data to the server.
      const updateGoalData =
        await updateCollection("my_goals", documentData);
  
      if (!updateGoalData.success) {
        alert(updateGoalData.data);
        return;
      };
    };

    // After a successful edit, reload the profile page.
    window.location.reload();
  }
}