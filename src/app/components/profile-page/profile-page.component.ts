import { Component } from '@angular/core';
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
import validateProfile from 'src/app/functions/validate-profile';
import genders from 'src/app/json/genders.json';
import convertBirthdayToAge from 'src/app/functions/convert-birthday-to-age';
import routes from 'src/app/json/routes.json';
import getWeekday from 'src/app/functions/get-weekday';
import reduceProfileRoutine from 'src/app/functions/reduce-profile-routine';
import calculateBmr from 'src/app/functions/calculate-bmr';
import allValuesNull from 'src/app/functions/all-values-null';
import storeLocalProfileData from 'src/app/functions/store-local-profile-data';
import orderDaysOfWeek from 'src/app/functions/order-days-of-week';
import getWeekdayAsNumber from 'src/app/functions/get-weekday-as-number';
import { BoxItemComponent } from '../box-item/box-item.component';
import getProfileMyMealPlan from 'src/app/functions/get-profile-my-meal-plan';
import orderGoals from 'src/app/functions/order-goals';
import { GoalItemComponent } from '../goal-item/goal-item.component';
import calculateCalorieGainLoss
from 'src/app/functions/calculate-calorie-gain-loss';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
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
    BoxItemComponent,
    GoalItemComponent
  ]
})
export class ProfilePageComponent {
  
  profileData: any;
  myRoutineWeeklyData: any;
  myRoutineData: any;
  routineData: any;
  myRoutineNoData: string = "...";
  myMealPlanWeeklyData: any;
  myMealPlanData: any;
  myMealPlanNoData: string = "...";
  myMealPlanBreakfast: any;
  myMealPlanLunch: any;
  myMealPlanDinner: any;
  myGoalsData: any;
  myGoalsNoData: string = "...";
  completedGoals: number = 0;
  totalGoals: number = 0;
  naturalCalorieLoss: string = "0";
  calorieLossTrackerNoData: string = "...";
  caloriesLost: string = "";
  caloriesGained: string = "";
  weekday: string = "";
  showModal: boolean = false;
  height: string = "";
  heightEdit: string = "";
  heightErrorText: string = "";
  weight: string = "";
  weightEdit: string = "";
  weightErrorText: string = "";
  age: string = "";
  birthday: any = "";
  birthdayEdit: any = "";
  birthdayErrorText: string = "";
  gender: string = "";
  genderEdit: string = "";
  genderErrorText: string = "";
  genders: string[] = genders;
  routes: any = routes;

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

    this.profileData = await getData("profile");

    this.myRoutineWeeklyData = await getData("my_routine");
    this.myRoutineData =
    reduceProfileRoutine(this.myRoutineWeeklyData, this.weekday.toLowerCase());

    this.myMealPlanWeeklyData = await getData("my_meal_plan");
    this.myMealPlanData = this.myMealPlanWeeklyData.data
      .json[this.weekday.toLowerCase()];

    this.myGoalsData = (await getData("my_goals")).data.json;

    // No data available.
    if (typeof this.myRoutineData === "string") {
      this.myRoutineNoData = this.myRoutineData;

    } else {
      this.myRoutineNoData = "";
    };

    if (allValuesNull(this.myMealPlanData)) {
      this.myMealPlanNoData = "No meal plan data available for today";

    } else {
      this.myMealPlanNoData = "";
    };

    if (allValuesNull(this.myGoalsData)) {
      this.myGoalsNoData = "No goal data available";

    } else {
      this.myGoalsNoData = "";
      this.myGoalsData = orderGoals(this.myGoalsData);
      this.totalGoals = this.myGoalsData
        .filter((goal: { type: string; }) => goal.type).length;
      this.completedGoals = this.myGoalsData
        .filter(
          (goal: { percentage: string; }) => goal.percentage === "100"
        ).length;
    };

    if (!this.profileData.success) {

      // If Fetch failed, do not display the error message.
      if (!this.profileData.data) return;

      alert(this.profileData.data);
      return;
    };

    // Set the profile data.
    this.height = this.profileData.data.json.height.height;
    this.weight = this.profileData.data.json.weight.weight;
    this.age = !this.profileData.data.json.age.birthday ? ""
      : convertBirthdayToAge(this.profileData.data.json.age.birthday);
    this.birthday = !this.profileData.data.json.age.birthday ? "" :
      new Date(this.profileData.data.json.age.birthday);
    this.gender = this.profileData.data.json.gender.gender;

    this.myMealPlanBreakfast =
      getProfileMyMealPlan(this.myMealPlanData.breakfast, "breakfast");
    this.myMealPlanLunch =
      getProfileMyMealPlan(this.myMealPlanData.lunch, "lunch");
    this.myMealPlanDinner =
      getProfileMyMealPlan(this.myMealPlanData.dinner, "dinner");

    // Calculate BMR.
    this.naturalCalorieLoss = calculateBmr(this.height, this.weight,
      this.age, this.gender);
    
    this.routineData = orderDaysOfWeek(this.myRoutineWeeklyData.data.json)
      [getWeekdayAsNumber(this.weekday)];
      
    // Calculate calories extracted, relative to today.
    this.caloriesLost =
      calculateCalorieGainLoss(this.myRoutineWeeklyData.data.json)
      .reduce((a: any, b: any) => a + b, 0).toLocaleString();

    // Calculate calorie intake, relative to today.
    this.caloriesGained =
      calculateCalorieGainLoss(this.myMealPlanWeeklyData.data.json)
      .reduce((a: any, b: any) => a + b, 0).toLocaleString();

    if (this.caloriesLost === "0" && this.naturalCalorieLoss === "0"
      && this.caloriesGained === "0"
    ) {
      this.calorieLossTrackerNoData = "No calorie loss data available";
    } else {
      this.calorieLossTrackerNoData = "";
    };

    storeLocalProfileData(this.profileData.data.json);
    
    this.resetEdit();
  }

  /**
   * Resets the edit variables to their original values.
   * This function is called when the user either clicks the
   * "Cancel" button on the modal or when the user's profile
   * is successfully updated.
   */
  resetEdit() {
    this.heightEdit = this.profileData.data.json.height.height;
    this.weightEdit = this.profileData.data.json.weight.weight;
    this.birthdayEdit = !this.profileData.data.json.age.birthday ? "" :
      new Date(this.profileData.data.json.age.birthday);
    this.genderEdit = this.profileData.data.json.gender.gender;
  }

  /**
   * Toggles the modal for editing a user's profile.
   * The modal is initially hidden. When the user clicks
   * the "Edit" button, the modal is shown. When the user
   * clicks the "Cancel" button or clicks anywhere outside
   * the modal, the modal is hidden.
   */
  toggleModal() {
    this.showModal = !this.showModal;
  }

  /**
   * Hides the modal and resets the edit variables to their original values.
   * This function is called when the user either clicks the
   * "Cancel" button on the modal or clicks anywhere outside
   * the modal.
   */
  hideModal = () => {
    this.showModal = false;
    this.resetEdit();
  }

  /**
   * Confirms the edit of the users' profile. The function sends the users'
   * edited profile to the server and updates the local storage if the user
   * is not logged in. If the update is successful, the function reloads the
   * profile page.
   */
  async confirmEdit() {

    // Validate the uer input.
    const profileData = validateProfile(this.heightEdit, this.weightEdit,
      this.birthdayEdit, this.genderEdit);

    // If any of the data is invalid, display an error message.
    if (!profileData.allValid) {
      this.heightErrorText = profileData.height;
      this.weightErrorText = profileData.weight;
      this.birthdayErrorText = profileData.birthday;
      this.genderErrorText = profileData.gender;
      return;

    } else {
      this.heightErrorText = "";
      this.weightErrorText = "";
      this.birthdayErrorText = "";
      this.genderErrorText = "";
    };
    
    const documentData = {
      "height": {
        "height": this.heightEdit || null
      },
      "weight": {
        "weight": this.weightEdit || null
      },
      "age": {
        "birthday": this.birthdayEdit || null
      },
      "gender": {
        "gender": this.genderEdit || null
      }
    };

    // Send the profile data to the server.
    const updateProfileData = await updateCollection("profile", documentData);

    if (!updateProfileData.success) {
      alert(updateProfileData.data);
      return;
    };

    // After a successful edit, reload the profile page.
    window.location.reload();
  }
}