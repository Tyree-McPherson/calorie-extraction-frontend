import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [MatCardModule, MatButtonModule, CommonModule]
})
export class CardComponent {

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() subText: string = "";
  @Input() subSubText: string = "";
  @Input() image: string = "";
  @Input() imageAlt: string = "";
  @Input() buttonText: string = "";
  @Output() buttonClicked = new EventEmitter<void>();
  routePrefix: string = environment.routePrefix;
}
