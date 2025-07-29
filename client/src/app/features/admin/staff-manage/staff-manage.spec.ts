import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManage } from './staff-manage';

describe('StaffManage', () => {
  let component: StaffManage;
  let fixture: ComponentFixture<StaffManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffManage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffManage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
