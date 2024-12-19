import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditpageComponent } from './admineditpage.component';

describe('AdmineditpageComponent', () => {
  let component: AdmineditpageComponent;
  let fixture: ComponentFixture<AdmineditpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmineditpageComponent]
    });
    fixture = TestBed.createComponent(AdmineditpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
