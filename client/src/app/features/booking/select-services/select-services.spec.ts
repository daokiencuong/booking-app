import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectServices } from './select-services';

describe('SelectServices', () => {
  let component: SelectServices;
  let fixture: ComponentFixture<SelectServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
