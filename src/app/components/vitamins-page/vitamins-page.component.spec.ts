import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VitaminsPageComponent } from './vitamins-page.component';

describe('VitaminsPageComponent', () => {
  let component: VitaminsPageComponent;
  let fixture: ComponentFixture<VitaminsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VitaminsPageComponent]
    });
    fixture = TestBed.createComponent(VitaminsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
