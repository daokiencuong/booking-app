import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/service/api.service';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './booking-management.html',
  styleUrls: ['./booking-management.scss']
})
export class BookingManagementComponent implements OnInit {
  private api = inject(ApiService);
  bookings = signal<any[]>([]);
  statuses = ['pending', 'confirmed', 'done', 'cancelled'];

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.get<any[]>('/api/bookings').subscribe(data => this.bookings.set(data));
  }

  updateStatus(bookingId: string, status: string) {
    this.api.put(`/api/bookings/${bookingId}`, { status }).subscribe(() => this.load());
  }
} 