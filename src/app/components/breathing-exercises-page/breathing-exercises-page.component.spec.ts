import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreathingExercisesPageComponent }
from './breathing-exercises-page.component';

describe('BreathingExercisesPageComponent', () => {
  let component: BreathingExercisesPageComponent;
  let fixture: ComponentFixture<BreathingExercisesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreathingExercisesPageComponent]
    });
    fixture = TestBed.createComponent(BreathingExercisesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
