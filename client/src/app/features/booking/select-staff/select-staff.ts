import { Component, inject, signal } from '@angular/core';
import { StaffService } from '../../../core/services/staff-service';
import { BookingStateService } from '../../../core/services/booking-state-service';
import { StaffGet } from '../../../model/response/staff/staff-get.model';
import { NgToastService } from 'ng-angular-popup';

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
    private bookingStateService: BookingStateService,
    private toast: NgToastService
  ) {
    this.staffService.getAllStaff().subscribe({
      next: (res) => {
        this.listStaff.set(res);
        this.bookingStateService.setTotalActiveStaff(res.length);
      },
      error: (err) => {
        console.error(err);
        const message = err?.error?.message || err?.message || 'Load staff failed';
        const error = err?.error?.error || 'Unknown error occurred';
        this.toast.danger(message, error, 3000);
      },
    });
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
