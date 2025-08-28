import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingGetForStaffRes } from '../../../model/response/booking/booking-get-for-staff-res.model';
import { DurationPipe } from '../../../shared/pipes/duration-pipe-pipe';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  templateUrl: './booking-detail.html',
  styleUrl: './booking-detail.css',
})
export class BookingDetailComponent {
  @Input() booking: BookingGetForStaffRes | null = null;
  @Input() showModal = false;
  @Output() closeModal = new EventEmitter<void>();

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

  onClose() {
    this.closeModal.emit();
  }
}

