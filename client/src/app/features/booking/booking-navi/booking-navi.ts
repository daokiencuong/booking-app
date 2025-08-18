import { Component, computed, inject, input, output } from '@angular/core';
import { BookingService } from '../../../core/services/booking-service';
import { DurationPipe } from '../../../shared/pipes/duration-pipe-pipe';
import { BookingStateService } from '../../../core/services/booking-state-service';

@Component({
  selector: 'app-booking-navi',
  imports: [DurationPipe],
  templateUrl: './booking-navi.html',
  styleUrl: './booking-navi.css',
})
export class BookingNavi {
  bookingStateService = inject(BookingStateService);

  currentStep = input.required<number>();
  nextStep = output();
  prevStep = output();

  listServiceSelected = computed(() =>
    this.bookingStateService.mainServiceSelected()
  );

  totalMoney = computed(() => this.bookingStateService.getTotalPrice());

  totalDuration = computed(() => this.bookingStateService.getTotalDuration());

  totalService = computed(() => this.bookingStateService.getTotalService());

  onNextStep() {
    this.nextStep.emit();
  }

  onPrevStep() {
    this.prevStep.emit();
  }
}
