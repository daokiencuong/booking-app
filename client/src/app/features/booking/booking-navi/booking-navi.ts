import { Component, computed, input, output } from '@angular/core';
import { BookingService } from '../../../core/services/booking-service';

@Component({
  selector: 'app-booking-navi',
  imports: [],
  templateUrl: './booking-navi.html',
  styleUrl: './booking-navi.css',
})
export class BookingNavi {
  currentStep = input.required<number>();
  nextStep = output();
  prevStep = output();

  listServiceSelected = computed(() =>
    this.bookingService.getAllSeviceSelected()
  );

  totalMoney = computed(() => this.bookingService.getTotalPrice());

  totalDuration = computed(() => this.bookingService.getTotalDuration());

  totalService = computed(() => this.bookingService.getTotalService());

  constructor(private bookingService: BookingService) {}

  onNextStep() {
    this.nextStep.emit();
  }

  onPrevStep() {
    this.prevStep.emit();
  }
}
