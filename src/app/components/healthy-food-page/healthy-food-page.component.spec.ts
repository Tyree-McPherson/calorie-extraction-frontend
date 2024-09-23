import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthyFoodPageComponent } from './healthy-food-page.component';

describe('HealthyFoodPageComponent', () => {
  let component: HealthyFoodPageComponent;
  let fixture: ComponentFixture<HealthyFoodPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthyFoodPageComponent]
    });
    fixture = TestBed.createComponent(HealthyFoodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
