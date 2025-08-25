import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManageModal } from './staff-manage-modal';

describe('StaffManageModal', () => {
  let component: StaffManageModal;
  let fixture: ComponentFixture<StaffManageModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffManageModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffManageModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
