import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcategoryproductComponent } from './allcategoryproduct.component';

describe('AllcategoryproductComponent', () => {
  let component: AllcategoryproductComponent;
  let fixture: ComponentFixture<AllcategoryproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllcategoryproductComponent]
    });
    fixture = TestBed.createComponent(AllcategoryproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
