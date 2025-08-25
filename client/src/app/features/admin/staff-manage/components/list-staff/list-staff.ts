import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaffGet } from '../../../../../model/response/staff/staff-get.model';

@Component({
  selector: 'app-list-staff',
  imports: [FormsModule],
  templateUrl: './list-staff.html',
  styleUrl: './list-staff.css',
})
export class ListStaff {
  staffList = input<StaffGet[]>([]);
  itemsPerPage = input<number>(5);
  currentPage = input<number>(1);
  totalPages = input<number>(1);

  next = output<void>();
  prev = output<void>();
  itemsPerPageChange = output<number>();

  // New outputs for actions
  editStaff = output<StaffGet>();
  changePassword = output<StaffGet>();
  deleteStaff = output<StaffGet>();
}
