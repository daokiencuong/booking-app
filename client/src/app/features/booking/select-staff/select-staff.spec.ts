import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStaff } from './select-staff';

describe('SelectStaff', () => {
  let component: SelectStaff;
  let fixture: ComponentFixture<SelectStaff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectStaff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectStaff);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
