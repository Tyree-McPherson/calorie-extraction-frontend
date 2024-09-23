import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [MatIconModule]
})
export class AlertComponent {
  @Input({ required: true }) text: string = "";
  @Input({ required: true }) class: string = "success" || "failure";
}
