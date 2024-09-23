import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-box-item',
  standalone: true,
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss'],
  imports: [RouterModule, CommonModule, MatIconModule]
})
export class BoxItemComponent {

  @Input({ required: true }) icon: string = "";
  @Input({ required: true }) description: string = "";
  @Input({ required: true }) duration: string = "";
}
