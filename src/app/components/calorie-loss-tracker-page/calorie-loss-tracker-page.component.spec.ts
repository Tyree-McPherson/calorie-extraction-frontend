import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalorieLossTrackerPageComponent }
from './calorie-loss-tracker-page.component';

describe('CalorieLossTrackerPageComponent', () => {
  let component: CalorieLossTrackerPageComponent;
  let fixture: ComponentFixture<CalorieLossTrackerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalorieLossTrackerPageComponent]
    });
    fixture = TestBed.createComponent(CalorieLossTrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
