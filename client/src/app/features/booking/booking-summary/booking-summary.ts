import {
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { DurationPipe } from '../../../shared/pipes/duration-pipe-pipe';
import { BookingStateService } from '../../../core/services/booking-state-service';

@Component({
  selector: 'app-booking-summary',
  imports: [DurationPipe],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.css',
})
export class BookingSummary {
  bookingStateService = inject(BookingStateService);

  currentStep = input.required<number>();
  nextStep = output();
  prevStep = output();

  listServiceSelected = computed(() =>
    this.bookingStateService.mainServiceSelected()
  );

  totalMoney = computed(() => this.bookingStateService.getTotalPrice());

  totalDuration = computed(() => this.bookingStateService.getTotalDuration());

  onNextStep() {
    this.nextStep.emit();
  }

  onPrevStep() {
    this.prevStep.emit();
  }
}
