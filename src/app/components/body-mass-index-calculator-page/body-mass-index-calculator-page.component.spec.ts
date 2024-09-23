import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMassIndexCalculatorPageComponent }
from './body-mass-index-calculator-page.component';

describe('BodyMassIndexCalculatorPageComponent', () => {
  let component: BodyMassIndexCalculatorPageComponent;
  let fixture: ComponentFixture<BodyMassIndexCalculatorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyMassIndexCalculatorPageComponent]
    });
    fixture = TestBed.createComponent(BodyMassIndexCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate Body Mass Index as underweight', () => {
    component.valueHeight = '150';
    component.valueWeight = '49';
    component.valueHeightSelect = 'cm';
    component.valueWeightSelect = 'kg';
    component.getBodyMassIndex();
    expect(component.bodyMassIndexConsideration).toContain('underweight');
  });

  it('should calculate Body Mass Index as normal', () => {
    component.valueHeight = '170';
    component.valueWeight = '70';
    component.valueHeightSelect = 'cm';
    component.valueWeightSelect = 'kg';
    component.getBodyMassIndex();
    expect(component.bodyMassIndexConsideration).toContain('normal');
  });

  it('should calculate Body Mass Index as overweight', () => {
    component.valueHeight = '170';
    component.valueWeight = '90';
    component.valueHeightSelect = 'cm';
    component.valueWeightSelect = 'kg';
    component.getBodyMassIndex();
    expect(component.bodyMassIndexConsideration).toContain('overweight');
  });

  it('should calculate Body Mass Index as obese', () => {
    component.valueHeight = '170';
    component.valueWeight = '100';
    component.valueHeightSelect = 'cm';
    component.valueWeightSelect = 'kg';
    component.getBodyMassIndex();
    expect(component.bodyMassIndexConsideration).toContain('obese');
  });

  it('should calculate Body Mass Index as severely obese', () => {
    component.valueHeight = '170';
    component.valueWeight = '120';
    component.valueHeightSelect = 'cm';
    component.valueWeightSelect = 'kg';
    component.getBodyMassIndex();
    expect(component.bodyMassIndexConsideration).toContain('extremely obese');
  });
});
