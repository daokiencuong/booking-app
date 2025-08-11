import { Component, input, signal } from '@angular/core';
import { MainServiceGet } from '../../../../../model/response/service/main-service-get.model';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../../../../shared/pipes/duration-pipe-pipe';

@Component({
  selector: 'app-main-service',
  imports: [CommonModule, DurationPipe],
  templateUrl: './main-service.html',
  styleUrl: './main-service.css',
  host: {
    '(click)': 'onSelect()',
  }
})
export class MainService {
  mainService = input.required<MainServiceGet>();
  isChecked = signal<boolean>(false);

  onSelect() {
    this.isChecked.update((prev) => !prev);
  }
}
