import {
  Component, EventEmitter, HostListener, Input, Output
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [MatIconModule]
})
export class ModalComponent {

  @Input() heading: string = "";
  @Input() clickAway: Function = () => {};
  @Input() messageText: string = "";
  @Input() errorMessage: boolean = false;
  @Output() clickElsewhere = new EventEmitter <MouseEvent> ();

  /**
   * Add 'modal-open' class to body when component is initialized.
   * This is to prevent scrolling of the main content when modal is open.
   */
  ngOnInit() {
    document.body.classList.add('modal-open');
  }

  /**
   * Remove 'modal-open' class from body when component is destroyed.
   * This is to restore the main content's ability to scroll when the modal is
   * closed.
   */
  ngOnDestroy() {
    document.body.classList.remove('modal-open');
  }
  
  @HostListener('document:click', ['$event'])

  /**
   * This function is called whenever a click event is registered on the
   * document (i.e. when the user clicks anywhere outside the modal). If the
   * click was outside the modal, the function will call the clickAway()
   * function and remove the 'modal-open' class from the body, effectively
   * closing the modal.
   */
  public onDocumentClick(event: any): void {
    
    const targetElement = event.target!.id;
    const modalActive = document.getElementById('modal');

    // Check if the click was outside the modal.
    if (targetElement === 'modal' && modalActive) {
      this.clickAway();
      document.body.classList.remove('modal-open');
    };
  }
}
