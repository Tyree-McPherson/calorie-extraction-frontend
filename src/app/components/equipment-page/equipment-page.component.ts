import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from "../grid/grid.component";
import { FilterComponent } from "../filter/filter.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CardComponent } from '../card/card.component';
import equipment from 'src/app/json/equipment.json';
import { PaginateComponent } from "../paginate/paginate.component";
import { PageEvent } from '@angular/material/paginator';
import shuffleArray from 'src/app/functions/shuffle-array';
import equipmentFilter from 'src/app/json/equipment-filter.json';

@Component({
  selector: 'app-equipment-page',
  standalone: true,
  templateUrl: './equipment-page.component.html',
  styleUrls: ['./equipment-page.component.scss'],
  imports: [
    GridComponent,
    FilterComponent,
    SearchBarComponent,
    CardComponent,
    CommonModule,
    PaginateComponent
  ]
})
export class EquipmentPageComponent {

  filterDropdownItems: string[] = equipmentFilter;
  allEquipment: any[] = equipment;
  equipment: any[] = [];
  totalItems: number = 0;
  currentFilter: string = "";
  pageSize: number = 10;

  @ViewChild(PaginateComponent) child: PaginateComponent | undefined;
  @ViewChild(FilterComponent) childFilter: FilterComponent | undefined;
  @ViewChild(SearchBarComponent) childSearch: SearchBarComponent | undefined;

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It sets up the data for the equipment page.
   * 
   * It shuffles the order of the equipment.
   * It sets the first 10 items of the equipment in the component.
   * It sets the total items of the equipment in the component.
   */
  ngOnInit() {

    // Shuffle the order of equipment.
    this.allEquipment = shuffleArray(this.allEquipment);

    // Initialize the pagination. Get the first 10 items from the equipment.
    this.equipment = this.allEquipment.slice(0, 10);
    this.totalItems = this.allEquipment.length;
  }

  /**
   * Handles pagination events from the PaginateComponent.
   * 
   * When this function is called, it filters the equipment based on the
   * current filter. It then paginates the filtered equipment based on the
   * event's page index and page size.
   * @param event The PageEvent emitted by the PaginateComponent.
   */
  handlePagination(event: PageEvent) {

    this.equipment = this.allEquipment.filter(equipment => {
      return equipment.type === this.currentFilter || true
    })
      .slice(
        event.pageIndex * event.pageSize,
        event.pageIndex * event.pageSize + event.pageSize
      );
  }

  /**
   * Handles filter events from the FilterComponent.
   * 
   * When this function is called, it filters the equipment based on the
   * filter. If the filter is "reset", it resets the equipment to the
   * first 10 items. Otherwise, it filters the equipment based on the
   * filter and sets the first 10 of the filtered items to the component.
   * It then updates the pagination component with the new total items
   * and resets the current page index to 0.
   * @param filter The filter item selected by the user.
   */
  async setFilter(filter: string) {

    if (filter === "reset") {

      this.equipment = this.allEquipment.slice(0, this.pageSize);
      this.totalItems = this.allEquipment.length;
      this.currentFilter = "";
      
    } else {
      
      this.equipment = this.allEquipment
        .filter(equipment => equipment.type === filter)
        .slice(0, this.pageSize);
      this.totalItems = this.equipment.length;
      this.currentFilter = filter;
    };
    
    this.childSearch?.clearSearch();
    this.child?.handleFilterUpdate({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalItems
    });
  }

  /**
   * Handles search events from the SearchBarComponent.
   * 
   * When this function is called, it filters the equipment based on the
   * search bar's value. If the search bar is empty, it shows all the items.
   * Otherwise, it filters the equipment based on the search bar's value and
   * sets the first 10 of the filtered items to the component. It then
   * updates the pagination component with the new total items and resets
   * the current page index to 0.
   * @param value The search bar's value.
   */
  handleSearch(value: string) {

    // If the search bar is empty, show all the items.
    if (value === "") {
      this.equipment = this.allEquipment.slice(0, this.pageSize);
      this.totalItems = this.allEquipment.length;
      return;
    };

    // If the search bar is not empty, filter the items.
    this.equipment = this.allEquipment
      .filter(equipment => {
        return (
          equipment.title
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          equipment.description
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      })
      .slice(0, this.pageSize);
    this.totalItems = this.equipment.length;
    this.childFilter?.removeFilter();
    this.child?.handleFilterUpdate({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalItems
    });
  }

  /**
   * Redirects to the Amazon page for the given link.
   * @param link The Amazon link to redirect to.
   */
  buyNow(link: string) {

    // Redirect to the Amazon page.
    window.location.href = link;
  }
}