import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from "../grid/grid.component";
import { FilterComponent } from "../filter/filter.component";
import { CardComponent } from '../card/card.component';
import vitamins from 'src/app/json/vitamins.json';
import { PaginateComponent } from "../paginate/paginate.component";
import { PageEvent } from '@angular/material/paginator';
import shuffleArray from 'src/app/functions/shuffle-array';
import vitaminsFilter from 'src/app/json/vitamins-filter.json';

@Component({
  selector: 'app-vitamins-page',
  standalone: true,
  templateUrl: './vitamins-page.component.html',
  styleUrls: ['./vitamins-page.component.scss'],
  imports: [
    GridComponent,
    FilterComponent,
    CardComponent,
    CommonModule,
    PaginateComponent
  ]
})
export class VitaminsPageComponent {

  filterDropdownItems: string[] = vitaminsFilter;
  allVitamins: any[] = vitamins;
  vitamins: any[] = [];
  totalItems: number = 0;
  currentFilter: string = "";
  pageSize: number = 10;

  @ViewChild(PaginateComponent) child: PaginateComponent | undefined;

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It shuffles the order of the vitamins array and then
   * sets the first 10 items of the shuffled array to the
   * vitamins property. It also sets the totalItems property
   * to the length of the shuffled array.
   */
  ngOnInit() {

    // Shuffle the order of vitamins.
    this.allVitamins = shuffleArray(this.allVitamins);

    // Initialize the pagination. Get the first 10 items from the vitamins.
    this.vitamins = this.allVitamins.slice(0, 10);
    this.totalItems = this.allVitamins.length;
  }

  /**
   * Handles pagination events from the PaginateComponent.
   * 
   * When this function is called, it filters the allVitamins array
   * based on the current filter. It then paginates the filtered
   * allVitamins array based on the event's page index and page size.
   * @param event The PageEvent emitted by the PaginateComponent.
   */
  handlePagination(event: PageEvent) {

    this.vitamins = this.allVitamins.filter(vitamins => {
      return vitamins.type === this.currentFilter || true
    })
      .slice(
        event.pageIndex * event.pageSize,
        event.pageIndex * event.pageSize + event.pageSize
      );
  }

  /**
   * Handles filter events from the FilterComponent.
   * 
   * When this function is called, it filters the allVitamins based on the
   * filter. If the filter is "reset", it resets the allVitamins to the
   * first 10 items. Otherwise, it filters the allVitamins based on the
   * filter and sets the first 10 of the filtered items to the component.
   * It then updates the pagination component with the new total items
   * and resets the current page index to 0.
   * @param filter The filter item selected by the user.
   */
  async setFilter(filter: string) {

    if (filter === "reset") {

      this.vitamins = this.allVitamins.slice(0, this.pageSize);
      this.totalItems = this.allVitamins.length;
      this.currentFilter = "";
      
    } else {
      
      this.vitamins = this.allVitamins
        .filter(vitamins => vitamins.type === filter)
        .slice(0, this.pageSize);
      this.totalItems = this.vitamins.length;
      this.currentFilter = filter;
    };
    
    this.child?.handleFilterUpdate({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalItems
    });
  }

  /**
   * Redirects to the web page for the given link.
   * @param link The web link to redirect to.
   */
  buyNow(link: string) {

    // Redirect to the web page.
    window.location.href = link;
  }
}