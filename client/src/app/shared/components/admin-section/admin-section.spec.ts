import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSection } from './admin-section';

describe('AdminSection', () => {
  let component: AdminSection;
  let fixture: ComponentFixture<AdminSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
