import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageTextOverlayComponent } from './image-text-overlay.component';

describe('ImageTextOverlayComponent', () => {
  let component: ImageTextOverlayComponent;
  let fixture: ComponentFixture<ImageTextOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageTextOverlayComponent]
    });
    fixture = TestBed.createComponent(ImageTextOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
