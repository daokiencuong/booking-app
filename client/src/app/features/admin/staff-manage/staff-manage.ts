import { Component, effect, signal } from '@angular/core';
import { StaffService } from '../../../core/services/staff-service';
import { StaffGet } from '../../../model/response/staff/staff-get.model';
import { AdminSection } from '../../../shared/components/admin-section/admin-section';
import { ListStaff } from './components/list-staff/list-staff';
import { NewStaff } from './components/new-staff/new-staff';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'staff-manage',
  imports: [ListStaff, NewStaff, AdminSection],
  templateUrl: './staff-manage.html',
  styleUrl: './staff-manage.css',
})
export class StaffManage {
  isDialogCreateOpen = signal<boolean>(false);
  staffList = signal<StaffGet[]>([]);
  itemsPerPage = signal<number>(5);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  constructor(
    private staffService: StaffService,
    private toast: NgToastService
  ) {
    effect(() => {
      const page = this.currentPage();
      const size = this.itemsPerPage();
      this.load(page, size);
    });
  }

  private load(page: number, size: number) {
    this.staffService.getAllUserForAdmin(page, size).subscribe({
      next: (res) => {
        this.totalPages.set(res.meta.pages);
        this.staffList.set(res.result);
      },
      error: (err) => {
        console.error(err);
        const message = err?.error?.message || err?.message || 'Fetch staff list failed';
        const error = err?.error?.error || 'Unknown error occurred';
        this.toast.danger(message, error, 3000);
      },
    });
  }

  openDialogCreate() {
    this.isDialogCreateOpen.set(true);
  }

  closeDialogCreate() {
    this.isDialogCreateOpen.set(false);
  }

  onNextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((prev) => ++prev);
    }
  }

  onPrevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((prev) => --prev);
    }
  }

  onItemsPerPageChange(size: number) {
    this.itemsPerPage.set(Number(size));
    this.currentPage.set(1);
  }

  onCreated() {
    this.load(this.currentPage(), this.itemsPerPage());
    this.closeDialogCreate();
  }
}
