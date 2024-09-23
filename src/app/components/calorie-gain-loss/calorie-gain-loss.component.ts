import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import weekdaysInOrder from 'src/app/json/weekdays-in-order.json';

@Component({
  selector: 'app-calorie-gain-loss',
  standalone: true,
  templateUrl: './calorie-gain-loss.component.html',
  styleUrls: ['./calorie-gain-loss.component.scss'],
  imports: [CommonModule]
})
export class CalorieGainLossComponent {

  data: any = [];
  @Input({ required: true }) calories: number[] = [];
  @Input({ required: true }) extracted: boolean = true;

  /**
   * Lifecycle hook that is called when any data-bound property of a directive
   * changes. This is called when the component is initialized and when the
   * component is changed.
   *
   * @param changes - Map of changed input properties. Key is property name,
   *                 value is SimpleChange object.
   */
  ngOnChanges(changes: any) {

    const caloriesArray = changes.calories.currentValue;

    for (let i = 0; i < caloriesArray.length; i++) {
      this.data.push({
        weekday: weekdaysInOrder[i],
        calories: caloriesArray[i].toLocaleString()
      });
    };
  }
}
