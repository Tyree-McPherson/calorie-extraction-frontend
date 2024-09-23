import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import routes from '../json/routes.json';
import isLoggedIn from './is-logged-in';

@Injectable({ providedIn: 'root' })
export class determineAuthState implements CanActivate {

  constructor(private router: Router) { }

/**
 * Determines whether the current route can be activated based on the user's
 * login status.
 *
 * @summary Checks the user's login status to determine route activation.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
  canActivate(): boolean {

    const userLoggedIn = isLoggedIn();

    if (userLoggedIn) {
      
      return true;

    } else {

      this.router.navigate([routes.index]);
      return false;
    };
  }
}

/**
 * Logs in the user.
 *
 * @summary Logs in the user.
 * @param {string} accessToken - The access token.
 * @param {string} userID - The user ID.
 */
export function loginUser(accessToken: string, userID: string) {
  
  // Log the user in.
  // Save the access token and UserID.
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("userID", userID);
}

/**
 * Logs out the user.
 *
 * @summary Logs out the user.
 */
export function logoutUser() {

  // Log the user out.
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userID");
  localStorage.removeItem("profileData");
}