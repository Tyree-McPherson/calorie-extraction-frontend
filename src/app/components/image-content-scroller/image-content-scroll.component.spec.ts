import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageContentScrollComponent } from './image-content-scroll.component';

describe('ImageContentScrollComponent', () => {
  let component: ImageContentScrollComponent;
  let fixture: ComponentFixture<ImageContentScrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageContentScrollComponent]
    });
    fixture = TestBed.createComponent(ImageContentScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
