import { DatePipe } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { BookingStateService } from '../../../core/services/booking-state-service';
import { DurationPipe } from '../../../shared/pipes/duration-pipe-pipe';

@Component({
  selector: 'app-review-and-confirm',
  imports: [DatePipe, DurationPipe, ReactiveFormsModule],
  templateUrl: './review-and-confirm.html',
  styleUrl: './review-and-confirm.css',
})
export class ReviewAndConfirm {
  bookingStateService = inject(BookingStateService);
  toast = inject(NgToastService);
  currentStep = input.required<number>();
  prevStep = output();
  nextStep = output();
  isSending = signal<boolean>(false);

  customerInfoForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    notes: new FormControl(''),
  });

  onPrevStep() {
    this.prevStep.emit();
  }

  onNextStep() {
    this.nextStep.emit();
  }

  reloadPage() {
    window.location.reload();
  }

  onSubmit() {
    this.isSending.set(true);
    this.bookingStateService
      .createBooking(
        this.customerInfoForm.value.name || '',
        this.customerInfoForm.value.email || '',
        this.customerInfoForm.value.notes || ''
      )
      .subscribe({
        next: () => {
          // Success case - toast is now handled at service level
        },
        error: (err) => {
          console.error(err);
          const message =
            err?.error?.message || err?.message || 'Create booking failed';
          const error = err?.error?.error || 'Unknown error occurred';
          this.toast.danger(message, error, 3000);
          this.isSending.set(false);
        },
        complete: () => {
          this.isSending.set(false);
          this.onNextStep();
        },
      });
  }
}
