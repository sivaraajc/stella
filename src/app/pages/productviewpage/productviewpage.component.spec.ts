import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductviewpageComponent } from './productviewpage.component';

describe('ProductviewpageComponent', () => {
  let component: ProductviewpageComponent;
  let fixture: ComponentFixture<ProductviewpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductviewpageComponent]
    });
    fixture = TestBed.createComponent(ProductviewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
