import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from "../grid/grid.component";
import { CardComponent } from '../card/card.component';
import massages from 'src/app/json/massages.json';
import { PaginateComponent } from "../paginate/paginate.component";
import { PageEvent } from '@angular/material/paginator';
import shuffleArray from 'src/app/functions/shuffle-array';

@Component({
  selector: 'app-massages-page',
  standalone: true,
  templateUrl: './massages-page.component.html',
  styleUrls: ['./massages-page.component.scss'],
  imports: [
    GridComponent,
    CardComponent,
    CommonModule,
    PaginateComponent
  ]
})
export class MassagesPageComponent {

  allMassages: any[] = massages;
  massages: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It shuffles the order of the massages array and then
   * sets the first 10 items of the shuffled array to the
   * massages property. It also sets the totalItems property
   * to the length of the shuffled array.
   */
  ngOnInit() {

    // Shuffle the order of yoga.
    this.allMassages = shuffleArray(this.allMassages);

    // Initialize the pagination. Get the first 10 items from the massage.
    this.massages = this.allMassages.slice(0, 10);
    this.totalItems = this.allMassages.length;
  }

  /**
   * Handles pagination events from the PaginateComponent.
   * 
   * When this function is called, it paginates the allMassages array
   * based on the event's page index and page size.
   * @param event The PageEvent emitted by the PaginateComponent.
   */
  handlePagination(event: PageEvent) {

    this.massages = this.allMassages.slice(
      event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize
    );
  }

  /**
   * Redirects the user to a URL when called.
   * 
   * @param link The URL to redirect the user to.
   */
  learnMore(link: string) {
    window.location.href = link;
  }
}