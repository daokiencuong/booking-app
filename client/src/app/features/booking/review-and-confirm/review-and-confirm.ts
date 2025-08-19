import { Component, inject, input, OnInit, output } from '@angular/core';
import { BookingStateService } from '../../../core/services/booking-state-service';
import { DatePipe } from '@angular/common';
import { DurationPipe } from '../../../shared/pipes/duration-pipe-pipe';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-review-and-confirm',
  imports: [DatePipe, DurationPipe, ReactiveFormsModule],
  templateUrl: './review-and-confirm.html',
  styleUrl: './review-and-confirm.css',
})
export class ReviewAndConfirm {
  bookingStateService = inject(BookingStateService);
  currentStep = input.required<number>();
  prevStep = output();
  nextStep = output();

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
    this.bookingStateService
      .createBooking(
        this.customerInfoForm.value.name || '',
        this.customerInfoForm.value.email || '',
        this.customerInfoForm.value.notes || ''
      )
      .subscribe({
        complete:() => {
          this.onNextStep();
        }
      });
  }
}
