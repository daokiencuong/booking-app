import { Component, inject, signal } from '@angular/core';
import { ListStaff } from '../../admin/staff-manage/components/list-staff/list-staff';
import { StaffActiveGet } from '../../../model/response/staff/staff-active-get.model';
import { StaffService } from '../../../core/services/staff-service';

@Component({
  selector: 'app-select-staff',
  imports: [],
  templateUrl: './select-staff.html',
  styleUrl: './select-staff.css',
})
export class SelectStaff {
  isCardOpen = signal<boolean>(false);
  staffIdSelected = signal<number>(0);
  listStaff = signal<StaffActiveGet[]>([]);

  constructor(private staffService: StaffService) {
    this.staffService.getAllStaff().subscribe((res) => this.listStaff.set(res));
  }

  onClick() {
    this.isCardOpen.update((prev) => !prev);
  }

  isSeleted(id: number) {
    return id === this.staffIdSelected();
  }

  onSelected(id: number) {
    this.staffIdSelected.set(id);
  }
}
