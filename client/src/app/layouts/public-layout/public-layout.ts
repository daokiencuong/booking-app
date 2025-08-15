import { Component, signal } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { SelectServices } from '../../features/booking/select-services/select-services';

@Component({
  selector: 'app-public-layout',
  imports: [Header, Footer, SelectServices],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {
  step = signal<number>(1);

  nextStep() {
    this.step.update((prevVal) => prevVal++);
  }

  backStep() {
    if (this.step() > 4) {
    } else {
      this.step.update((prevVal) => prevVal--);
    }
  }
}
