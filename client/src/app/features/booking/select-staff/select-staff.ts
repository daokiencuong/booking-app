import { Component, inject, signal } from '@angular/core';
import { StaffService } from '../../../core/services/staff-service';
import { BookingStateService } from '../../../core/services/booking-state-service';
import { StaffGet } from '../../../model/response/staff/staff-get.model';

@Component({
  selector: 'app-select-staff',
  imports: [],
  templateUrl: './select-staff.html',
  styleUrl: './select-staff.css',
})
export class SelectStaff {
  isCardOpen = signal<boolean>(false);
  listStaff = signal<StaffGet[]>([]);

  constructor(
    private staffService: StaffService,
    private bookingStateService: BookingStateService
  ) {
    this.staffService.getAllStaff().subscribe((res) => this.listStaff.set(res));
  }

  onClick() {
    this.isCardOpen.update((prev) => !prev);
  }

  isSeleted(id: number) {
    return id === this.bookingStateService.staffSeleted()?.id;
  }

  onSelected(id: number, name: string) {
    this.bookingStateService.selectStaff({ id: id, name: name });
  }
}
