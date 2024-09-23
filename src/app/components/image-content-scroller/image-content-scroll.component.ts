import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-content-scroll',
  standalone: true,
  templateUrl: './image-content-scroll.component.html',
  styleUrls: ['./image-content-scroll.component.scss'],
  imports: [CommonModule, ButtonComponent, MatIconModule]
})
export class ImageContentScrollComponent {
  @Input() nutritionContent: Array<nutritionImageScroll> = [];
  currentItem: number = 2;
  routePrefix: string = environment.routePrefix;

   /**
   * Change the value of currentItem based on the given parameter.
   *
   * @param {boolean} increase - A boolean indicating whether to increase or
   * decrease the value of currentItem.
   * @return {void} This function does not return any value.
   */
  changeItem(increase: boolean) {
    if (increase) {

      this.transitionImages(true);

      setTimeout(() => {
        this.currentItem++;
        this.removeTransition();
      }, 500);

    } else {

      this.transitionImages(false);
      
      setTimeout(() => {
        this.currentItem--;
        this.removeTransition();
      }, 500);
    };
  }

  /**
   * Add or remove classes to or from the main image and the next/previous
   * image based on the given parameter.
   *
   * @param {boolean} forward - A boolean indicating whether to add the classes
   * for the "next" transition or the "previous" transition.
   * @return {void} This function does not return any value.
   */
  transitionImages(forward: boolean) {
    
    if (forward) {

      document.getElementById('image-gallery-main-image')
      ?.classList.add('image-gallery-next');
      document.getElementById('image-gallery-next')
      ?.classList.add('image-gallery-next-image');
      
    } else {
      
      document.getElementById('image-gallery-main-image')
      ?.classList.add('image-gallery-previous');
      document.getElementById('image-gallery-previous')
      ?.classList.add('image-gallery-previous-image');
    };
  }

  /**
   * Remove the transition classes from the main image and the next/previous
   * image after the transition has finished. This is called in the
   * `changeItem` method after the transition has finished.
   */
  removeTransition() {
    document.getElementById('image-gallery-main-image')
    ?.classList.remove('image-gallery-next');
    document.getElementById('image-gallery-main-image')
    ?.classList.remove('image-gallery-previous');
    document.getElementById('image-gallery-next')
    ?.classList.remove('image-gallery-next-image');
    document.getElementById('image-gallery-next')
    ?.classList.remove('image-gallery-previous-image');
  }
}
