import { Component, input, OnInit, output } from '@angular/core';
import { BookingService } from '../../../core/services/booking-service';
import { BookingStateService } from '../../../core/services/booking-state-service';

@Component({
  selector: 'app-review-and-confirm',
  imports: [],
  templateUrl: './review-and-confirm.html',
  styleUrl: './review-and-confirm.css',
})
export class ReviewAndConfirm {
  currentStep = input.required<number>();
  prevStep = output();

  constructor(private bookingStateService: BookingStateService) {
    this.bookingStateService.getAllDataBooking();
  }

  onPrevStep() {
    this.prevStep.emit();
  }

  reloadPage() {
    window.location.reload();
  }
}
