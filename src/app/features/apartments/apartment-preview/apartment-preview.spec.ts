import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentPreviewComponent } from './apartment-preview';

describe('ApartmentPreviewComponent', () => {
  let component: ApartmentPreviewComponent;
  let fixture: ComponentFixture<ApartmentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentPreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
