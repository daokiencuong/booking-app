import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNavi } from './booking-navi';

describe('BookingNavi', () => {
  let component: BookingNavi;
  let fixture: ComponentFixture<BookingNavi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingNavi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingNavi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
