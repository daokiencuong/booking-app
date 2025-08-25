import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { StaffGet } from '../../../../../model/response/staff/staff-get.model';
import { StaffService } from '../../../../../core/services/staff-service';
import { StaffUpdateReq } from '../../../../../model/request/staff/staff-update-req.model';
import { StaffUpdatePasswordForceReq } from '../../../../../model/request/staff/staff-update-password-force-req.model';

export type ModalType = 'edit' | 'changePassword';

@Component({
  selector: 'app-staff-manage-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-manage-modal.html',
  styleUrl: './staff-manage-modal.css',
})
export class StaffManageModal {
  isOpen = input<boolean>(false);
  modalType = input<ModalType>('edit');
  staffData = input<StaffGet | null>(null);

  closeModal = output<void>();
  staffUpdated = output<void>();

  // Form data
  editForm = signal({
    name: '',
    description: '',
    staffActive: false,
  });

  passwordForm = signal({
    newPassword: '',
    confirmPassword: '',
  });

  isLoading = signal<boolean>(false);

  private staffService = inject(StaffService);
  private toast = inject(NgToastService);

  constructor() {
    // Use effect to watch for staffData changes
    effect(() => {
      const staff = this.staffData();
      if (staff) {
        this.editForm.set({
          name: staff.name || '',
          description: staff.description || '',
          staffActive: staff.staffActive || false,
        });
      }
    });
  }

  onSubmit() {
    if (this.modalType() === 'edit') {
      this.updateStaffInfo();
    } else {
      this.changePassword();
    }
  }

  private updateStaffInfo() {
    const staff = this.staffData();
    if (!staff) return;

    const updateData: StaffUpdateReq = {
      id: staff.id,
      name: this.editForm().name,
      description: this.editForm().description,
      staffActive: this.editForm().staffActive,
    };

    this.isLoading.set(true);
    this.staffService.updateUserInfo(updateData).subscribe({
      next: () => {
        this.toast.success('Staff information updated successfully', 'Success');
        this.staffUpdated.emit();
        this.closeModal.emit();
      },
      error: (err: any) => {
        const message =
          err?.error?.message || 'Failed to update staff information';
        this.toast.danger(message, 'Error');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  private changePassword() {
    const staff = this.staffData();
    if (
      !staff ||
      this.passwordForm().newPassword !== this.passwordForm().confirmPassword
    ) {
      this.toast.danger('Passwords do not match', 'Error');
      return;
    }

    const passwordData: StaffUpdatePasswordForceReq = {
      id: staff.id,
      password: this.passwordForm().newPassword,
    };

    this.isLoading.set(true);
    this.staffService.changeForcePassword(passwordData).subscribe({
      next: () => {
        this.toast.success('Password changed successfully', 'Success', 3000);
        this.staffUpdated.emit();
        this.closeModal.emit();
      },
      error: (err: any) => {
        const message = err?.error?.message || 'Failed to change password';
        this.toast.danger(message, 'Error', 3000);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  onCancel() {
    this.closeModal.emit();
  }
}
