import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTime } from './select-time';

describe('SelectTime', () => {
  let component: SelectTime;
  let fixture: ComponentFixture<SelectTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
