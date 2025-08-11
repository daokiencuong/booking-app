import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndConfirm } from './review-and-confirm';

describe('ReviewAndConfirm', () => {
  let component: ReviewAndConfirm;
  let fixture: ComponentFixture<ReviewAndConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewAndConfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAndConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
