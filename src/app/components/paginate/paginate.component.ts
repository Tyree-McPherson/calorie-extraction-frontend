import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginate',
  standalone: true,
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss'],
  imports: [MatPaginatorModule]
})
export class PaginateComponent {

  @Input() totalItems: number = 0;
  @Output() paginationClicked = new EventEmitter<PageEvent>();
  
  itemsPerPage: number = 10;
  pageEvent: PageEvent;
  pageIndex: number = 0;

  /**
   * Initializes the component by creating a new PageEvent object.
   * This is required so that the component can be used in a template
   * without having to manually create a new PageEvent object.
   */
  constructor() {
    this.pageEvent = new PageEvent();
  }

  /**
   * Handles a page change event emitted by the MatPaginator.
   *
   * When this function is called, it emits a PageEvent to the
   * paginationClicked @Output property. It also updates the
   * component's properties based on the event.
   *
   * @param e The PageEvent emitted by the MatPaginator.
   */
  handlePageEvent(e: PageEvent) {

    // Scroll to the top of the page.
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });

    this.pageEvent = e;
    this.totalItems = e.length;
    this.itemsPerPage = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.paginationClicked.emit(e);
  }

  /**
   * Handles a filter update event emitted by the FilterComponent.
   *
   * When this function is called, it updates the component's properties
   * based on the event.
   *
   * @param e The PageEvent emitted by the FilterComponent.
   */
  handleFilterUpdate(e: PageEvent) {
    this.pageEvent = e;
    this.totalItems = e.length;
    this.itemsPerPage = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
