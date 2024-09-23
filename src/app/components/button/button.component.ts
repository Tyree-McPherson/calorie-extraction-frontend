import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [MatButtonModule, CommonModule, RouterModule]
})
export class ButtonComponent {
  @Input() text: string = "";
  @Input() click: Function = () => {};
  @Input() flat: boolean = false;
  @Input() url: boolean = false;
  @Input() urlPath: string = "";
  @Input() inverted: boolean = false;
}
