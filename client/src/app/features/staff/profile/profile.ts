import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { StaffService } from '../../../core/services/staff-service';
import { StaffGet } from '../../../model/response/staff/staff-get.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {
  staffProfile: StaffGet | null = null;
  staffService = inject(StaffService);
  toast = inject(NgToastService);

  ngOnInit() {
    this.loadStaffProfile();
  }

  loadStaffProfile() {
    this.staffService.getUserInfo().subscribe({
      next: (res) => {
        this.staffProfile = res;
      },
      error: (error) => {
        const message =
          error?.error?.message || error?.message || 'Load user info failed';
        const errorMsg = error?.error?.error || 'Unknown error occurred';
        this.toast.danger(message, errorMsg, 3000);
      },
    });
  }

  getRoleDisplayName(role: string): string {
    return role === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên';
  }

  getStatusDisplayName(active: boolean): string {
    return active ? 'Đang hoạt động' : 'Không hoạt động';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
