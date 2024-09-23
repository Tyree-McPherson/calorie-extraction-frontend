import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MassagesPageComponent } from './massages-page.component';

describe('MassagesPageComponent', () => {
  let component: MassagesPageComponent;
  let fixture: ComponentFixture<MassagesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MassagesPageComponent]
    });
    fixture = TestBed.createComponent(MassagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
