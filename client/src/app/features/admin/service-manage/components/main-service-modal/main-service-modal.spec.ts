import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServiceModal } from './main-service-modal';

describe('MainServiceModal', () => {
  let component: MainServiceModal;
  let fixture: ComponentFixture<MainServiceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainServiceModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainServiceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
