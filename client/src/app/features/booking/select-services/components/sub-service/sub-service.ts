import { Component, input, output, signal } from '@angular/core';
import { SubServiceGet } from '../../../../../model/response/service/sub-service-get.model';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../../../../shared/pipes/duration-pipe-pipe';

@Component({
  selector: 'app-sub-service',
  imports: [CommonModule, DurationPipe],
  templateUrl: './sub-service.html',
  styleUrl: './sub-service.css',
  host: {
    '(click)': 'onClick()',
  }
})
export class SubService {
  subServiceData = input.required<SubServiceGet>();
  isChecked = input.required<boolean>();
  checked = output<SubServiceGet>();

  onClick(){
    this.checked.emit(this.subServiceData());
  }
}
