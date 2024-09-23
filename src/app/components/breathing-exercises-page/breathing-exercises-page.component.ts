import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from "../grid/grid.component";
import shuffleArray from 'src/app/functions/shuffle-array';
import breathingExercises from 'src/app/json/breathing-exercises.json';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-breathing-exercises-page',
  standalone: true,
  templateUrl: './breathing-exercises-page.component.html',
  styleUrls: ['./breathing-exercises-page.component.scss'],
  imports: [
    GridComponent,
    CommonModule,
  ]
})
export class BreathingExercisesPageComponent {

  breathingExercises: any[] = breathingExercises;
  routePrefix: string = environment.routePrefix;

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It shuffles the order of breathing exercises.
   */
  ngOnInit() {

    // Shuffle the order of breathing exercises.
    this.breathingExercises = shuffleArray(this.breathingExercises);
  }
}