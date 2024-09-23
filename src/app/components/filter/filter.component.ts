import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [MatIconModule, CommonModule]
})
export class FilterComponent {

  filterDropdown: boolean = false;
  @Input({ required: true }) dropdownItems: string[] = [];
  @Output() filterItemSelected = new EventEmitter<string | "reset">();

  /**
   * Toggles the dropdown on or off.
   * This is a two-way databinding function, which means that the dropdown
   * state is updated whenever the user clicks on the dropdown button,
   * and the button icon is updated whenever the dropdown state changes.
   */
  toggleDropdown() {
    this.filterDropdown = !this.filterDropdown;
  }

  /**
   * Handles the selection of a filter dropdown item.
   * If the same dropdown item is selected, remove the filter entirely.
   * Otherwise, remove the 'dropdown-selected' class from all dropdown items,
   * add the 'dropdown-selected' class to the selected item, and emit the
   * selected dropdown item to the parent component.
   * @param dropdownItem The text of the selected dropdown item.
   * @param i The index of the selected dropdown item.
   */
  dropdownSelected(dropdownItem: string, i: number) {

    // Remove the 'dropdown-selected' class from all dropdown items.
    const dropdownItems = document.getElementsByClassName('dropdown-item');
    const selectedItem = document.getElementById('filter-dropdown-item-' + i);

    // If the same dropdown item is selected, remove the filter entirely.
    if (selectedItem?.classList.contains('dropdown-selected')) {
      selectedItem.classList.remove('dropdown-selected');
      this.filterItemSelected.emit("reset");
      return;
    };

    for (let j = 0; j < dropdownItems.length; j++) {
      dropdownItems[j].classList.remove('dropdown-selected');
    };

    // Add the 'dropdown-selected' class to the selected dropdown item.
    if (selectedItem) {
      selectedItem.classList.add('dropdown-selected');
      
      // Emit the selected dropdown item.
      this.filterItemSelected.emit(dropdownItem);
    };
  }

  /**
   * Removes the 'dropdown-selected' class from all dropdown items.
   * This is usually called when the user clicks on the filter button
   * and wants to reset the filter.
   */
  removeFilter() {

    const dropdownItems = document.getElementsByClassName('dropdown-item');
    
    for (let j = 0; j < dropdownItems.length; j++) {
      dropdownItems[j].classList.remove('dropdown-selected');
    };
  }
}
