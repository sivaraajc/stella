import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashboradComponent } from './admindashborad.component';

describe('AdmindashboradComponent', () => {
  let component: AdmindashboradComponent;
  let fixture: ComponentFixture<AdmindashboradComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindashboradComponent]
    });
    fixture = TestBed.createComponent(AdmindashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
