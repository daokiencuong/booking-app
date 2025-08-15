import { Component, inject, input, output, signal } from '@angular/core';
import { MainServiceGet } from '../../../../../model/response/service/main-service-get.model';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../../../../shared/pipes/duration-pipe-pipe';
import { SubService } from '../sub-service/sub-service';
import { SubServiceGet } from '../../../../../model/response/service/sub-service-get.model';
import { BookingService } from '../../../../../core/services/booking-service';

@Component({
  selector: 'app-main-service',
  imports: [CommonModule, DurationPipe, SubService],
  templateUrl: './main-service.html',
  styleUrl: './main-service.css',
})
export class MainService {
  mainService = input.required<MainServiceGet>();
  subServiceChecked: SubServiceGet[] = [];
  bookingService = inject(BookingService);

  onSelect() {
    this.bookingService.onToggleMainService({
      ...this.mainService(),
      subServices: [],
    });
  }

  onPushSubservice(subServiceData: SubServiceGet) {
    const exists = this.subServiceChecked.some(
      (s) => s.id === subServiceData.id
    );
    if (exists) {
      this.subServiceChecked = this.subServiceChecked.filter(
        (subService) => subService.id !== subServiceData.id
      );
    } else {
      this.subServiceChecked.push(subServiceData);
    }

    this.bookingService.onUpdateSubService({
      ...this.mainService(),
      subServices: this.subServiceChecked,
    });
  }
}
