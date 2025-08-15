import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-booking-summary',
  imports: [],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.css'
})
export class BookingSummary {
  currentStep = input.required<number>();
  nextStep = output();
  prevStep = output();

  onNextStep(){
    this.nextStep.emit();
  }

  onPrevStep(){
    this.prevStep.emit();
  }
}
