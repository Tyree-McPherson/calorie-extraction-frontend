import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyGoalsPageComponent } from './my-goals-page.component';

describe('MyGoalsPageComponent', () => {
  let component: MyGoalsPageComponent;
  let fixture: ComponentFixture<MyGoalsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyGoalsPageComponent]
    });
    fixture = TestBed.createComponent(MyGoalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
