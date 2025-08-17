import { Component, signal } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { SelectServices } from '../../features/booking/select-services/select-services';
import { SelectTime } from "../../features/booking/select-time/select-time";
import { ReviewAndConfirm } from "../../features/booking/review-and-confirm/review-and-confirm";
import { BookingSummary } from "../../features/booking/booking-summary/booking-summary";
import { SelectStaff } from "../../features/booking/select-staff/select-staff";
import { BookingNavi } from "../../features/booking/booking-navi/booking-navi";

@Component({
  selector: 'app-public-layout',
  imports: [Header, Footer, SelectServices, SelectTime, ReviewAndConfirm, BookingSummary, SelectStaff, BookingNavi],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {
  step = signal<number>(1);

  nextStep() {
    this.step.update((prevVal) => ++prevVal);
    console.log(this.step());
    
  }

  backStep() {
    if (this.step() > 4) {
    } else {
      this.step.update((prevVal) => --prevVal);
    }
  }
}
