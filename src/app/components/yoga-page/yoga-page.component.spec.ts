import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YogaPageComponent } from './yoga-page.component';

describe('YogaPageComponent', () => {
  let component: YogaPageComponent;
  let fixture: ComponentFixture<YogaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YogaPageComponent]
    });
    fixture = TestBed.createComponent(YogaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
