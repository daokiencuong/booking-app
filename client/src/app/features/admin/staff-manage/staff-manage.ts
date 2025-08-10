import { Component, signal } from '@angular/core';
import { ListStaff } from './components/list-staff/list-staff';
import { NewStaff } from './components/new-staff/new-staff';
import { StaffCreateModel } from '../../../model/staff-create.model';
import { AdminSection } from '../../../shared/components/admin-section/admin-section';

@Component({
  selector: 'staff-manage',
  imports: [ListStaff, NewStaff, AdminSection],
  templateUrl: './staff-manage.html',
  styleUrl: './staff-manage.css',
})
export class StaffManage {
  isDialogCreateOpen = signal<boolean>(false);

  openDialogCreate() {
    this.isDialogCreateOpen.set(true);
  }

  closeDialogCreate() {
    this.isDialogCreateOpen.set(false);
  }

  createNewStaff(data: StaffCreateModel) {
    console.log(data);
  }
}
