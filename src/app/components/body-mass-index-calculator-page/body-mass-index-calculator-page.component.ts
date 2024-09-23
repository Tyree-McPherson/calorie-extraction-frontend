import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { FormFieldComponent } from "../form-field/form-field.component";
import calculateBodyMassIndex
from 'src/app/functions/calculate-body-mass-index';
import isLoggedIn from 'src/app/functions/is-logged-in';

@Component({
  selector: 'app-body-mass-index-calculator-page',
  standalone: true,
  templateUrl: './body-mass-index-calculator-page.component.html',
  styleUrls: ['./body-mass-index-calculator-page.component.scss'],
  imports: [ButtonComponent, FormFieldComponent]
})
export class BodyMassIndexCalculatorPageComponent {

  valueHeight = "";
  valueHeightSelect = "";
  valueWeight = "";
  valueWeightSelect = "";
  bodyMassIndex = "";
  bodyMassIndexConsideration = "";
  bodyMassIndexColor: string = "";
  heightErrorText: string = "";
  weightErrorText: string = "";
  heightError: boolean = false;
  weightError: boolean = false;

  /**
   * Initializes the component after Angular first displays the data-bound 
   * properties and sets the directive or component's input properties.
   * 
   * This function checks if the user is logged in. If so, get their profile 
   * data and if they entered their height and weight, auto fills them in. 
   * 
   * @return {Promise<void>} A promise that resolves when the function is 
   * completed.
   */
  async ngOnInit(): Promise<void> {

    // Check if the user is logged in. If so, get their profile data
    // and if they entered their height and weight, auto fill it in.
    const userLoggedIn = isLoggedIn();

    if (userLoggedIn) {

      const profileData = JSON.parse(localStorage.getItem("profileData")!);
      const height = profileData?.height?.height;
      const weight = profileData?.weight?.weight;

      if (height) {
        this.valueHeight = height;
        this.valueHeightSelect = "cm";
      };

      if (weight) {
        this.valueWeight = weight;
        this.valueWeightSelect = "lbs";
      };
    };
  }

  /**
   * Handles the selection of a height unit by updating the selected height
   * unit in the component.
   * 
   * @param {string} unit - The selected height unit.
   */
  handleHeightUnitSelectionChange(unit: string) {
    this.valueHeightSelect = unit;
  }

  /**
   * Handles the selection of a weight unit by updating the selected weight
   * unit in the component.
   * 
   * @param {string} unit - The selected weight unit.
   */
  handleWeightUnitSelectionChange(unit: string) {
    this.valueWeightSelect = unit;
  }

  /**
   * Calculates the Body Mass Index based on the user's entered height and
   * weight, and updates the component's state accordingly.
   * 
   * The function first checks if all form fields are filled in. If not, it
   * displays an error message and returns early.
   * 
   * If all form fields are filled in, the function calculates the Body Mass
   * Index using the calculateBodyMassIndex function. If the calculated Body
   * Mass Index is NaN, it displays an error message.
   * 
   * The function then updates the component's state with the calculated Body
   * Mass Index, and sets the bodyMassIndexConsideration and bodyMassIndexColor
   * fields based on the calculated Body Mass Index.
   */
  getBodyMassIndex() {

    // Check to see if all form fields are filled in.
    // If not, display an error message and return.
    if (this.valueHeight === "" || this.valueHeightSelect === "") {

      this.heightError = true;
      this.heightErrorText = "You must enter your height and select a unit";
      
    } else {
      
      this.heightError = false;
      this.heightErrorText = "";
    }
    
    if (this.valueWeight === "" || this.valueWeightSelect === "") {
      
      this.weightError = true;
      this.weightErrorText = "You must enter your weight and select a unit";

    } else {

      this.weightError = false;
      this.weightErrorText = "";
    };

    if (this.heightError || this.weightError) return;

    // Calculate the Body Mass Index.
    const bodyMassIndex = calculateBodyMassIndex(
      this.valueHeight, this.valueWeight,
      this.valueHeightSelect, this.valueWeightSelect
    );

    if (isNaN(bodyMassIndex)) {

      // Display an error message.
      this.heightError = true;
      this.heightErrorText = "Please ensure your height is in all numbers";
      this.weightError = true;
      this.weightErrorText = "Please ensure your weight is in all numbers";
    
    } else {

      this.heightError = false;
      this.heightErrorText = "";
      this.weightError = false;
      this.weightErrorText = "";

    };

    this.bodyMassIndex = `Your Body Mass Index is ${bodyMassIndex.toString()}`;
    
    if (bodyMassIndex < 18.5) {

      this.bodyMassIndexConsideration = "Your BMI is considered underweight";
      this.bodyMassIndexColor = "orange";

    } else if (bodyMassIndex >= 18.5 && bodyMassIndex <= 24.9) {

      this.bodyMassIndexConsideration = "Your BMI is considered normal weight";
      this.bodyMassIndexColor = "green";

    } else if (bodyMassIndex >= 25 && bodyMassIndex <= 29.9) {

      this.bodyMassIndexConsideration = "Your BMI is considered overweight";
      this.bodyMassIndexColor = "orange";

    } else if (bodyMassIndex >= 30 && bodyMassIndex <= 34.9) {

      this.bodyMassIndexConsideration = "Your BMI is considered obese";
      this.bodyMassIndexColor = "red";

    } else if (bodyMassIndex >= 35) {

      this.bodyMassIndexConsideration = "Your BMI is considered extremely obese";
      this.bodyMassIndexColor = "red";
    };
  }
}