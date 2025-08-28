import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from '../../../core/services/booking-service';
import { BookingGetForStaffRes } from '../../../model/response/booking/booking-get-for-staff-res.model';
import { BookingDetailComponent } from '../booking-detail/booking-detail';

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [CommonModule, BookingDetailComponent, FormsModule],
  templateUrl: './gantt-chart.html',
  styleUrl: './gantt-chart.css',
})
export class GanttChartComponent implements OnInit {
  private bookingService = inject(BookingService);
  private toast = inject(NgToastService);

  bookings: BookingGetForStaffRes[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0];
  timeSlots: string[] = [];
  selectedBooking: BookingGetForStaffRes | null = null;
  showModal = false;

  ngOnInit() {
    this.generateTimeSlots();
    this.loadBookings();
  }

  generateTimeSlots() {
    for (let hour = 9; hour <= 20; hour++) {
      this.timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
  }

  loadBookings() {
    this.bookingService.getAllBookingForStaff(this.selectedDate).subscribe({
      next: (response) => {
        this.bookings = response.result || [];
      },
      error: (error) => {
        const message =
          error?.error?.message || error?.message || 'Load booking failed';
        const errorMsg = error?.error?.error || 'Unknown error occurred';
        this.toast.danger(message, errorMsg, 3000);
      },
    });
  }

  onDateChange() {
    this.loadBookings();
  }

  getBookingsForTimeSlot(timeSlot: string): BookingGetForStaffRes[] {
    const hour = parseInt(timeSlot.split(':')[0]);
    return this.bookings.filter((booking) => {
      const startHour = parseInt(booking.startTime.split(':')[0]);
      return startHour === hour;
    });
  }

  openBookingModal(booking: BookingGetForStaffRes) {
    this.selectedBooking = booking;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBooking = null;
  }

  getServiceNames(booking: BookingGetForStaffRes): string {
    return booking.services
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

  getBookingStyle(booking: BookingGetForStaffRes) {
    const startTime = new Date(`2000-01-01T${booking.startTime}`);
    const endTime = new Date(`2000-01-01T${booking.endTime}`);

    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const baseMinutes = 9 * 60;
    const top = startMinutes - baseMinutes;

    const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
    const height = endMinutes - startMinutes;

    if (height > 60) {
      return {
        background: `linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)`,
        top: `${top}px`,
        height: `${height}px`,
        position: 'absolute' as const,
        left: '5px',
        right: '5px',
      };
    }

    return {
      background: `linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)`,
      top: `${top}px`,
      height: `${height}px`,
      position: 'absolute' as const,
      left: '5px',
      right: '5px',
    };
  }
}
