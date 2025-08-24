import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingService } from '../../../core/services/booking-service';
import { CalendarView } from './calendar-view';

describe('CalendarView', () => {
  let component: CalendarView;
  let fixture: ComponentFixture<CalendarView>;
  let mockBookingService: jasmine.SpyObj<BookingService>;

  beforeEach(async () => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', [
      'getAllBookingForAdmin',
    ]);

    await TestBed.configureTestingModule({
      imports: [CalendarView, HttpClientTestingModule],
      providers: [{ provide: BookingService, useValue: bookingServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarView);
    component = fixture.componentInstance;
    mockBookingService = TestBed.inject(
      BookingService
    ) as jasmine.SpyObj<BookingService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with today's date", () => {
    const today = new Date().toISOString().split('T')[0];
    expect(component.selectedDate).toBe(today);
  });

  it('should generate 15-min time slots from 09:00 to 19:00', () => {
    // 10 hours * 60 = 600 minutes / 15 = 40 slots
    expect(component.timeSlots.length).toBe(40);
    expect(component.timeSlots[0]).toBe('09:00');
    expect(component.timeSlots[component.timeSlots.length - 1]).toBe('18:45');
  });
});
