import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalorieIntakeTrackerPageComponent }
from './calorie-intake-tracker-page.component';

describe('CalorieIntakeTrackerPageComponent', () => {
  let component: CalorieIntakeTrackerPageComponent;
  let fixture: ComponentFixture<CalorieIntakeTrackerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalorieIntakeTrackerPageComponent]
    });
    fixture = TestBed.createComponent(CalorieIntakeTrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
