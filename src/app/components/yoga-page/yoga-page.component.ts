import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from "../grid/grid.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CardComponent } from '../card/card.component';
import yoga from 'src/app/json/yoga.json';
import { PaginateComponent } from "../paginate/paginate.component";
import { PageEvent } from '@angular/material/paginator';
import shuffleArray from 'src/app/functions/shuffle-array';

@Component({
  selector: 'app-yoga-page',
  standalone: true,
  templateUrl: './yoga-page.component.html',
  styleUrls: ['./yoga-page.component.scss'],
  imports: [
    GridComponent,
    SearchBarComponent,
    CardComponent,
    CommonModule,
    PaginateComponent
  ]
})
export class YogaPageComponent {

  allYoga: any[] = yoga;
  yoga: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;

  @ViewChild(PaginateComponent) child: PaginateComponent | undefined;

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It shuffles the order of the yoga array and then
   * sets the first 10 items of the shuffled array to the
   * yoga property. It also sets the totalItems property
   * to the length of the shuffled array.
   */
  ngOnInit() {

    // Shuffle the order of yoga.
    this.allYoga = shuffleArray(this.allYoga);

    // Initialize the pagination. Get the first 10 items from the yoga.
    this.yoga = this.allYoga.slice(0, 10);
    this.totalItems = this.allYoga.length;
  }

  /**
   * Handles pagination events from the PaginateComponent.
   * 
   * When this function is called, it paginates the allYoga array
   * based on the event's page index and page size.
   * @param event The PageEvent emitted by the PaginateComponent.
   */
  handlePagination(event: PageEvent) {

    this.yoga = this.allYoga.slice(
      event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize
    );
  }

  /**
   * Handles search events from the SearchBarComponent.
   * 
   * When this function is called, it filters the allYoga array
   * based on the search bar's value. If the search bar is empty,
   * it shows all the items. Otherwise, it filters the allYoga
   * array based on the search bar's value and sets the first
   * 10 of the filtered items to the yoga property. It also
   * updates the pagination component with the new total items
   * and resets the current page index to 0.
   * @param {string} value The search bar's value.
   */
  handleSearch(value: string) {

    // If the search bar is empty, show all the items.
    if (value === "") {
      this.yoga = this.allYoga.slice(0, this.pageSize);
      this.totalItems = this.allYoga.length;
      return;
    };

    // If the search bar is not empty, filter the items.
    this.yoga = this.allYoga
      .filter(yoga => {
        return (
          yoga.title
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          yoga.description
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      })
        .slice(0, this.pageSize);
    this.totalItems = this.yoga.length;
    this.child?.handleFilterUpdate({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalItems
    });
  }
}