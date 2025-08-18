import { TestBed } from '@angular/core/testing';

import { BookingStateService } from './booking-state-service';

describe('BookingState', () => {
  let service: BookingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
