import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRoutinePageComponent } from './my-routine-page.component';

describe('MyRoutinePageComponent', () => {
  let component: MyRoutinePageComponent;
  let fixture: ComponentFixture<MyRoutinePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRoutinePageComponent]
    });
    fixture = TestBed.createComponent(MyRoutinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
