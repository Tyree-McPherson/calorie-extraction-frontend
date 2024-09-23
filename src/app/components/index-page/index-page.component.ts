import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { ImageTextOverlayComponent }
from '../image-text-overlay/image-text-overlay.component';
import routes from '../../json/routes.json';
import nutritionContent from '../../json/nutrition-image-scroll.json';
import { ImageContentScrollComponent }
from '../image-content-scroller/image-content-scroll.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import validateEmail from '../../functions/validate-email';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-page',
  standalone: true,
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  imports: [
    MatIconModule, ButtonComponent, ImageTextOverlayComponent,
    ImageContentScrollComponent, InputFieldComponent, MatSnackBarModule,
    AlertComponent, CommonModule
  ]
})
export class IndexPageComponent {
  urlEquipment: string = routes.equipment;
  urlYoga: string = routes.yoga;
  urlBreathingExercises: string = routes.breathingExercises;
  urlMassages: string = routes.massages;
  urlWorkouts: string = routes.workouts;
  nutritionContent: nutritionImageScroll[] = nutritionContent;
  @Input() newsletterEmail: string = "";
  showAlert: boolean = false;
  newsletterEmailBottomText: string = "";
  routePrefix: string = environment.routePrefix;

  /**
   * Subscribe to the newsletter. This will validate the email, show
   * a success alert for 5 seconds, or show an error message if the
   * email is invalid.
   */
  subscribeToNewsletter() {

    // Validate the email.
    const isEmailValid = validateEmail(this.newsletterEmail);

    if (isEmailValid) {
      
      // Show the alert.
      this.showAlert = true;
      this.newsletterEmailBottomText = '';
      
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);

    } else {

      // Display error message.
      this.newsletterEmailBottomText = 'Email is invalid';
    }
  }

  /**
   * Handles the keyup event for the newsletter email input field.
   * The value of the input field is stored in the class property
   * newsletterEmail.
   * @param event The KeyboardEvent or any object that is emitted by the keyup
   *   event.
   */
  keyup($event: any) {
    this.newsletterEmail = $event.target.value;
  }
}
