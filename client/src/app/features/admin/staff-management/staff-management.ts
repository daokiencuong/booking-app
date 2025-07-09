import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../core/service/api.service';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-staff-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './staff-management.html',
  styleUrls: ['./staff-management.scss']
})
export class StaffManagementComponent implements OnInit {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  bookings = signal<any[]>([]);

  ngOnInit() {
    this.api.get<any[]>('/api/bookings', { staffId: this.auth.token }).subscribe(data => this.bookings.set(data));
  }

  updateStatus(bookingId: string, status: string) {
    this.api.put(`/api/bookings/${bookingId}`, { status }).subscribe(() => {
      this.bookings.set(this.bookings().map(b => b.id === bookingId ? { ...b, status } : b));
    });
  }
} 