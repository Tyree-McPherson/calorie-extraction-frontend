import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthyMealsPageComponent } from './healthy-meals-page.component';

describe('HealthyMealsPageComponent', () => {
  let component: HealthyMealsPageComponent;
  let fixture: ComponentFixture<HealthyMealsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthyMealsPageComponent]
    });
    fixture = TestBed.createComponent(HealthyMealsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
