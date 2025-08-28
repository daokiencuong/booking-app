import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from '../../../core/services/booking-service';
import { BookingGetForAdminRes } from '../../../model/response/booking/booking-get-for-admin-res.model';
import { ServiceGet } from '../../../model/response/booking/booking-get-for-staff-res.model';
import { AdminSection } from '../../../shared/components/admin-section/admin-section';
import { DurationPipe } from '../../../shared/pipes/duration-pipe-pipe';

interface StaffRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSection, DurationPipe],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.css',
})
export class CalendarView implements OnInit {
  private bookingService = inject(BookingService);
  private toast = inject(NgToastService);

  selectedDate: string = new Date().toISOString().split('T')[0];
  bookings: BookingGetForAdminRes[] = [];
  staffRows: StaffRow[] = [];
  loading = false;
  selectedBooking: BookingGetForAdminRes | null = null;
  showModal = false;

  readonly startHour = 9;
  readonly endHour = 20;
  readonly slotMinutes = 60;

  timeSlots: string[] = [];
  verticalRows: any[][] = [];

  ngOnInit(): void {
    this.generateTimeSlots();
    this.loadBookings();
  }

  generateTimeSlots() {
    this.timeSlots = [];
    for (let hour = this.startHour; hour <= this.endHour; hour++) {
      this.timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
  }

  loadBookings() {
    this.loading = true;
    this.bookingService.getAllBookingForAdmin(this.selectedDate).subscribe({
      next: (response) => {
        this.bookings = response.result || [];
        this.buildStaffRowsFromBookings();
        this.loading = false;
      },
      error: (error) => {
        const message =
          error?.error?.message || error?.message || 'Load bookings failed';
        const errorMsg = error?.error?.error || 'Unknown error occurred';
        this.toast.danger(message, errorMsg, 3000);
        this.bookings = [];
        this.staffRows = [];
        this.loading = false;
      },
    });
  }

  onDateChange() {
    this.loadBookings();
  }

  buildStaffRowsFromBookings() {
    const map = new Map<number, string>();
    for (const b of this.bookings) {
      if (!map.has(b.staff.id)) {
        map.set(b.staff.id, b.staff.name);
      }
    }
    this.staffRows = Array.from(map.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  }

  bookingsForStaff(staffId: number): BookingGetForAdminRes[] {
    return this.bookings.filter((b) => b.staff.id === staffId);
  }

  openBookingDetail(booking: BookingGetForAdminRes) {
    this.selectedBooking = booking;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBooking = null;
  }

  getServiceNames(services: ServiceGet[]): string {
    if (!services || services.length === 0) return 'Không có dịch vụ';
    return services
      .map((service) => {
        if (service.subServices == null || service.subServices.length == 0) {
          return service.name;
        }
        return (
          service.name +
          ' [' +
          service.subServices?.map((sub) => sub.name).join(', ') +
          ']'
        );
      })
      .join(', ');
  }

  getBookingStyle(booking: BookingGetForAdminRes) {
    const start = new Date(`2000-01-01T${booking.startTime}`);
    const end = new Date(`2000-01-01T${booking.endTime}`);
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = end.getHours() * 60 + end.getMinutes();
    const baseMinutes = this.startHour * 60;
    const top = startMinutes - baseMinutes;
    const height = Math.max(30, endMinutes - startMinutes);

    const isLong = height > 60;
    const background = isLong
      ? 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
      : 'linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)';

    return {
      background,
      top: `${top}px`,
      height: `${height}px`,
      position: 'absolute' as const,
      left: '5px',
      right: '5px',
    };
  }

  formatTime(timeString: string): string {
    const [h, m] = timeString.split(':');
    return `${h}:${m}`;
  }

  formatDuration(duration: string): string {
    if (!duration) return '';
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}p`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}p`;
    return duration;
  }
}
