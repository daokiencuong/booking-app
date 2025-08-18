import { Component, input, OnInit, output } from '@angular/core';
import { BookingService } from '../../../core/services/booking-service';

@Component({
  selector: 'app-review-and-confirm',
  imports: [],
  templateUrl: './review-and-confirm.html',
  styleUrl: './review-and-confirm.css',
})
export class ReviewAndConfirm{
  currentStep = input.required<number>();
  prevStep = output();

  // constructor(private bookingService: BookingService){
  //   this.bookingService.getAllBookingInfo();
  //   getAllBookingInfo() {
  //   console.log(this.mainServiceSelected);
  //   console.log(this.staffService.staffSeletedId);
  //   console.log(this.timeService.selectedHour, this.timeService.selectedHour);
  // }
  // }

  onPrevStep() {
    this.prevStep.emit();
  }

  reloadPage() {
    window.location.reload();
  }
}
