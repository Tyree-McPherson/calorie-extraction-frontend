import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalorieGainLossComponent } from './calorie-gain-loss.component';

describe('CalorieGainLossComponent', () => {
  let component: CalorieGainLossComponent;
  let fixture: ComponentFixture<CalorieGainLossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalorieGainLossComponent]
    });
    fixture = TestBed.createComponent(CalorieGainLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
