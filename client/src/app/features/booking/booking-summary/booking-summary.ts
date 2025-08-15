import {
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MainServiceGet } from '../../../model/response/service/main-service-get.model';
import { BookingService } from '../../../core/services/booking-service';

@Component({
  selector: 'app-booking-summary',
  imports: [],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.css',
})
export class BookingSummary {
  currentStep = input.required<number>();
  nextStep = output();
  prevStep = output();
  listServiceSelected = computed(() =>
    this.bookingService.getAllSeviceSelected()
  );

  totalMoney = computed(() => this.bookingService.getTotalPrice());

  totalDuration = computed(() => this.bookingService.getTotalDuration());

  constructor(private bookingService: BookingService) {}

  onNextStep() {
    this.nextStep.emit();
  }

  onPrevStep() {
    this.prevStep.emit();
  }
}
