import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-goal-item',
  standalone: true,
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.scss'],
  imports: [RouterModule, CommonModule, MatIconModule]
})
export class GoalItemComponent {

  @Input({ required: true }) icon: string = "";
  @Input({ required: true }) description: string = "";
  @Input({ required: true }) percentage: number = 0;
}
