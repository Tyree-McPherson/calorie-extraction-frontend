import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import healthyMeals from 'src/app/json/healthy-meals.json';
import { PaginateComponent } from "../paginate/paginate.component";
import { PageEvent } from '@angular/material/paginator';
import shuffleArray from 'src/app/functions/shuffle-array';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-healthy-meals-page',
  standalone: true,
  templateUrl: './healthy-meals-page.component.html',
  styleUrls: ['./healthy-meals-page.component.scss'],
  imports: [
    CommonModule,
    PaginateComponent,
    ButtonComponent,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class HealthyMealsPageComponent {

  allHealthyMeals: any[] = healthyMeals;
  healthyMeals: any[] = [];
  totalItems: number = 0;
  currentFilter: string = "";
  pageSize: number = 10;
  modalAvailableWeekdays: string[] = [];
  showModal: boolean = false;
  routePrefix: string = environment.routePrefix;

  @ViewChild(PaginateComponent) child: PaginateComponent | undefined;

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It shuffles the order of the healthyMeals array and then
   * sets the first 10 items of the shuffled array to the
   * healthyMeals property. It also sets the totalItems property
   * to the length of the shuffled array.
   */
  ngOnInit() {

    // Shuffle the order of healthyMeals.
    this.allHealthyMeals = shuffleArray(this.allHealthyMeals);

    // Initialize the pagination. Get the first 10 items from the healthyMeals.
    this.healthyMeals = this.allHealthyMeals.slice(0, 10);
    this.totalItems = this.allHealthyMeals.length;
  }

  /**
   * Handles pagination events from the PaginateComponent.
   * 
   * When this function is called, it paginates the healthyMeals array
   * based on the event's page index and page size.
   * @param event The PageEvent emitted by the PaginateComponent.
   */
  handlePagination(event: PageEvent) {

    this.healthyMeals = this.allHealthyMeals.slice(
      event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize
    );
  }

  /**
   * Redirects the user to a URL when called.
   *
   * @param link The URL to redirect the user to.
   */
  cookItem(link: string) {
    window.location.href = link;
  }

  /**
   * Returns an array of numbers from 0 to n-1.
   * @param n The number of elements to create in the array.
   * @returns An array of numbers starting from 0 up to n-1.
   */
  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 
}