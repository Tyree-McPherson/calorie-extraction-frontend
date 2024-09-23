import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyMealPlanPageComponent } from './my-meal-plan-page.component';

describe('MyMealPlanPageComponent', () => {
  let component: MyMealPlanPageComponent;
  let fixture: ComponentFixture<MyMealPlanPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyMealPlanPageComponent]
    });
    fixture = TestBed.createComponent(MyMealPlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
