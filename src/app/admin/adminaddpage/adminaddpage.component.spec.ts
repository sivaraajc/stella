import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddpageComponent } from './adminaddpage.component';

describe('AdminaddpageComponent', () => {
  let component: AdminaddpageComponent;
  let fixture: ComponentFixture<AdminaddpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminaddpageComponent]
    });
    fixture = TestBed.createComponent(AdminaddpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
