import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import routes from '../../json/routes.json';
import logout from 'src/app/functions/logout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [MatIconModule, CommonModule]
})
export class ProfileComponent {

  dropdown: boolean = false;
  routes: any = routes;

  constructor(private eRef: ElementRef, private router: Router) { }

  /**
   * Toggles the dropdown on or off.
   * This is a two-way databinding function, which means that the dropdown
   * state is updated whenever the user clicks on the dropdown button,
   * and the button icon is updated whenever the dropdown state changes.
   */
  toggleDropdown() {
    this.dropdown = !this.dropdown;
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

  @HostListener('document:click', ['$event'])
  
  /**
   * Checks if the click was outside the profile dropdown. If true, toggles the
   * dropdown off.
   * @param event The MouseEvent from the document click event.
   */
  public onDocumentClick(event: any): void {

    // Check if the click was outside the profile dropdown.
    if (!this.eRef.nativeElement.contains(event.target) && this.dropdown) {
      this.dropdown = false;
    }
  }
}
