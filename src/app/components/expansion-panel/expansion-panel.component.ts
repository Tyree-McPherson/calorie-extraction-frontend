import { Component, Input, Output, HostListener,
  EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  imports: [CommonModule, MatIconModule, RouterModule],
})

export class ExpansionPanelComponent {

  @Input() heading: string = '';
  @Input() list: Array<listNavigationItem> = [];
  dropdownActive: boolean = false;

  toggleDropdown = async () => this.dropdownActive = !this.dropdownActive;

  @Output() clickElsewhere = new EventEmitter <MouseEvent> ();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  
  /**
   * Checks if the click was outside the dropdown. If true, toggles the
   * dropdown off.
   * @param event The MouseEvent from the document click event.
   */
  public onDocumentClick(event: MouseEvent): void {
    
    const targetElement = event.target as HTMLElement;

    // Check if the click was outside the dropdown.
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)
    && this.dropdownActive) {

      this.toggleDropdown();
    };
  }
}
