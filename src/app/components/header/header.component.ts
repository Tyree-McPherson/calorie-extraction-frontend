import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from '../button/button.component';
import {
  ExpansionPanelComponent
} from '../expansion-panel/expansion-panel.component';
import listNavigationFitness from "../../json/list-navigation-fitness.json"
import listNavigationWellness from "../../json/list-navigation-wellness.json"
import listNavigationNutrition from "../../json/list-navigation-nutrition.json"
import { ModalComponent } from "../modal/modal.component";
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from "../input-field/input-field.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import validateEmail from '../../functions/validate-email';
import validatePassword from '../../functions/validate-password';
import signup from 'src/app/functions/signup';
import login from 'src/app/functions/login';
import routes from '../../json/routes.json';
import { determineAuthState }
from 'src/app/functions/determine-auth-state';
import { ProfileComponent } from '../profile/profile.component';
import logout from 'src/app/functions/logout';
import isLoggedIn from 'src/app/functions/is-logged-in';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
        MatToolbarModule,
        ButtonComponent,
        ExpansionPanelComponent,
        ModalComponent,
        CommonModule,
        InputFieldComponent,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        ProfileComponent
    ]
})
export class HeaderComponent {

  listFitness: Array<listNavigationItem> = listNavigationFitness;
  listWellness: Array<listNavigationItem> = listNavigationWellness;
  listNutrition: Array<listNavigationItem> = listNavigationNutrition;
  modalType: string = '';
  headerMenu: boolean = false;
  modalText: string = '';
  errorMessage: boolean = false;
  loggedIn: boolean = false;
  routes: any = routes;
  routePrefix: string = environment.routePrefix;

  // Sign up.
  signupEmail: string = '';
  signupEmailBottomText: string = '';
  signupPassword: string = '';
  signupPasswordBottomText: string = '';
  signupPasswordIsVisible: boolean = false;
  signupConfirmPassword: string = '';
  signupConfirmPasswordBottomText: string = '';
  signupConfirmPasswordIsVisible: boolean = false;

  // Login.
  loginEmail: string = '';
  loginPassword: string = '';
  loginEmailBottomText: string = '';
  loginPasswordBottomText: string = '';

  constructor(private router: Router ) { }

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It sets the page's title and meta tags.
   * 
   * This function sets the title of the page and adds the following meta tags:
   * - description
   * - keywords
   * - robots
   * - viewport
   * 
   * The function sets the meta tags from the metaTags.json file.
   */
  ngOnInit() {
    determineAuthState;

    this.loggedIn = isLoggedIn();
  }

  /**
   * Displays the login form.
   * 
   * This function sets the modalType class property to 'login' which
   * displays the login form.
   */
  login = () => {

    this.clearFields();

    // Display the login form.
    this.modalType = 'login';
  }

  /**
   * Displays the signup form.
   * 
   * This function sets the modalType class property to 'signup' which
   * displays the signup form.
   */
  signup = () => {

    this.clearFields();

    // Display the signup form.
    this.modalType = 'signup';
  }

  /**
   * Logs the user out and redirects them to the index page.
   * 
   * This function is called when the user clicks the logout button.
   * It prevents the default event action, logs the user out, and then
   * redirects them to the index page and reloads the page.
   * 
   * @param event The event object, which is used to prevent the default
   *   action.
   */
  async logoutClick(event: any) {
    event.preventDefault();
    await logout();

    // Redirect to the index page and reload the page.
    this.router.navigate([`/${routes.index}`])
    .then(() => window.location.reload());
  }

  /**
   * Hides the login/signup modal.
   * 
   * This function resets the modalType class property to an empty string,
   * which hides the modal. It also calls the clearFields function to clear
   * all the input fields and their bottom text.
   */
  hideModal = () => {
    this.modalType = '';
    this.clearFields();
  }

  
  /**
   * Clears all the input fields and their bottom text.
   * 
   * This function is called by the hideModal function to clear all the input
   * fields and their bottom text.
   */
  clearFields = () => {
    
    // Clear all the input fields and their bottom text.
    this.signupEmail = '';
    this.signupEmailBottomText = '';
    this.signupPassword = '';
    this.signupPasswordBottomText = '';
    this.signupPasswordIsVisible = false;
    this.signupConfirmPassword = '';
    this.signupConfirmPasswordBottomText = '';
    this.signupConfirmPasswordIsVisible = false;
    this.loginEmail = '';
    this.loginPassword = '';
    this.loginEmailBottomText = '';
    this.loginPasswordBottomText = '';
    this.errorMessage = false;
    this.modalText = '';
  }

  /**
   * Toggles the display of the dropdown menu. If the dropdown is currently
   * visible, it is hidden, and if it is currently hidden, it is shown.
   */
  toggleMenu() {
    this.headerMenu = !this.headerMenu;
  }

  /**
   * Handles the keyup event for each input field in the login and signup
   * forms. The value of the input field is stored in the corresponding class
   * property.
   * @param event The KeyboardEvent or any object that is emitted by the keyup
   *   event.
   */
  keyup(event: KeyboardEvent | any) {

    const id = event.target.id;
    const value = event.target.value;
    
    // Store the value of each input field.
    switch(id) {
      case'login-email':
        this.loginEmail = value;
        break;
      case'login-password':
        this.loginPassword = value;
        break;
      case'signup-email':
        this.signupEmail = value;
        break;
      case'signup-password':
        this.signupPassword = value;
        break;
      case'signup-confirm-password':
        this.signupConfirmPassword = value;
        break;
    }
  }

  /**
   * Handles the signup click event. Validates the email and password input
   * fields. If the input fields are valid, a POST request is sent to the
   * server to create a new user account.
   */
  signupClick = async () => {

    // Validate email.
    const isEmailValid = validateEmail(this.signupEmail);

    if (!isEmailValid) {
      this.signupEmailBottomText = 'Email is invalid';

    } else {
      this.signupEmailBottomText = '';
    }

    // Validate password.
    const isPasswordValid = validatePassword(this.signupPassword);

    if (!isPasswordValid.valid) {
      
      this.signupPasswordBottomText = isPasswordValid.value;

    } else {
      this.signupPasswordBottomText = '';
    }

    // Validate confirm password.
    const isConfirmPasswordValid
    = validatePassword(this.signupConfirmPassword, this.signupPassword);

    if (!isConfirmPasswordValid.valid) {
      this.signupConfirmPasswordBottomText = isConfirmPasswordValid.value;

    } else {
      this.signupConfirmPasswordBottomText = '';
    }

    const signupUser = await signup(this.signupEmail, this.signupPassword,
      this.signupConfirmPassword);

    if (!signupUser.success) {
      
      // Display an error message on the signup screen.
      this.errorMessage = true;
      this.modalText = signupUser.message;

    } else {

      // If the signup was successful, go to the login modal.
      this.errorMessage = false;
      this.hideModal();
      this.login();

      // Display a success message on the login screen.
      this.modalText = signupUser.message;
    }
  }

  /**
   * Handles the click event for the login button.
   *
   * @summary Handles the click event for the login button.
   * @returns {Promise<void>} A promise that resolves when the login
   *   functionality is complete.
   */
  loginClick = async () => {

    const loginUser = await login(this.loginEmail, this.loginPassword);

    if (!loginUser.success) {

      // Display an error message.
      this.errorMessage = true;
      this.modalText = loginUser.message;
      
    } else {
      this.errorMessage = false;
      this.modalText = "";
      this.hideModal();
      this.loggedIn = true;

      // Redirect to the dashboard.
      this.router.navigate([`/${routes.profile}`])
      .then(() => window.location.reload());
    }
  }
}
