import { Component, Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-text-overlay',
  standalone: true,
  templateUrl: './image-text-overlay.component.html',
  styleUrls: ['./image-text-overlay.component.scss'],
  imports: [RouterModule]
})
export class ImageTextOverlayComponent {
  @Input() text: string = "";
  @Input() image: string = "";
  @Input() url: string = "";
  routePrefix: string = environment.routePrefix;
}
