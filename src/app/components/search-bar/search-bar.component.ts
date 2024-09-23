import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldComponent } from "../form-field/form-field.component";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [FormFieldComponent]
})
export class SearchBarComponent {

  value: string = "";
  @Output() searchText = new EventEmitter<string>();

  /**
   * Emits the search text when the 'enter' key is pressed.
   *
   * @param key The KeyboardEvent to check.
   */
  searchItem(key: KeyboardEvent) {

    // If the key pressed is the 'enter' key, emit the search text.
    if (key.key === 'Enter' || key.keyCode === 13) {
      this.searchText.emit(this.value);
    };
  }

  /**
   * Emits the search text when the icon is clicked.
   */
  iconClick() {
    this.searchText.emit(this.value);
  }

  /**
   * Clears the search text.
   */
  clearSearch() {
    this.value = "";
  }
}
