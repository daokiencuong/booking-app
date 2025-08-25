import { Component, effect, signal } from '@angular/core';
import { StaffService } from '../../../core/services/staff-service';
import { StaffGet } from '../../../model/response/staff/staff-get.model';
import { AdminSection } from '../../../shared/components/admin-section/admin-section';
import { ListStaff } from './components/list-staff/list-staff';
import { NewStaff } from './components/new-staff/new-staff';
import { StaffManageModal } from './components/staff-manage-modal/staff-manage-modal';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'staff-manage',
  imports: [ListStaff, NewStaff, AdminSection, StaffManageModal],
  templateUrl: './staff-manage.html',
  styleUrl: './staff-manage.css',
})
export class StaffManage {
  isDialogCreateOpen = signal<boolean>(false);
  isModalOpen = signal<boolean>(false);
  modalType = signal<'edit' | 'changePassword'>('edit');
  selectedStaff = signal<StaffGet | null>(null);
  
  staffList = signal<StaffGet[]>([]);
  itemsPerPage = signal<number>(10);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  searchTerm = signal<string>('');

  constructor(
    private staffService: StaffService,
    private toast: NgToastService
  ) {
    effect(() => {
      const page = this.currentPage();
      const size = this.itemsPerPage();
      const search = this.searchTerm();
      this.load(page, size, search);
    });
  }

  private load(page: number, size: number, search: string = '') {
    this.staffService.getAllUserForAdmin(page, size, search).subscribe({
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

  // Handle staff actions
  onEditStaff(staff: StaffGet) {
    this.selectedStaff.set(staff);
    this.modalType.set('edit');
    this.isModalOpen.set(true);
  }

  onChangePassword(staff: StaffGet) {
    this.selectedStaff.set(staff);
    this.modalType.set('changePassword');
    this.isModalOpen.set(true);
  }

  onDeleteStaff(staff: StaffGet) {
    if (confirm(`Are you sure you want to delete ${staff.name}?`)) {
      this.staffService.deleteUser(staff.id).subscribe({
        next: () => {
          this.toast.success('Staff deleted successfully', 'Success');
          this.load(this.currentPage(), this.itemsPerPage(), this.searchTerm());
        },
        error: (err) => {
          const message = err?.error?.message || 'Failed to delete staff';
          this.toast.danger(message, 'Error');
        }
      });
    }
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedStaff.set(null);
  }

  onStaffUpdated() {
    this.load(this.currentPage(), this.itemsPerPage(), this.searchTerm());
  }

  // Search functionality
  onSearchChange(searchValue: string) {
    this.searchTerm.set(searchValue);
    this.currentPage.set(1); // Reset to first page when searching
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
    this.load(this.currentPage(), this.itemsPerPage(), this.searchTerm());
    this.closeDialogCreate();
  }
}
