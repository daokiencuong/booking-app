import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule, MatStepperModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule
  ],
  templateUrl: './booking.html',
  styleUrls: ['./booking.scss']
})
export class BookingComponent {
  private api = inject(ApiService);
  private snack = inject(MatSnackBar);

  step = signal(0);
  services = signal<any[]>([]);
  selectedService = signal<string | null>(null);
  times = signal<any[]>([]);
  selectedTime = signal<string | null>(null);
  customer = signal({ name: '', phone: '', note: '' });

  ngOnInit() {
    this.api.get<any[]>('/api/services').subscribe(data => this.services.set(data));
  }

  onServiceSelect() {
    this.api.get<any[]>('/api/available-times', { serviceId: this.selectedService() }).subscribe(data => this.times.set(data));
    this.step.set(1);
  }

  onTimeSelect() {
    this.step.set(2);
  }

  confirmBooking() {
    const payload = {
      serviceId: this.selectedService(),
      time: this.selectedTime(),
      customer: this.customer(),
    };
    this.api.post('/api/bookings', payload).subscribe({
      next: () => {
        this.snack.open('Đặt lịch thành công!');
        this.step.set(0);
        this.selectedService.set(null);
        this.selectedTime.set(null);
        this.customer.set({ name: '', phone: '', note: '' });
      },
      error: () => this.snack.open('Có lỗi xảy ra, vui lòng thử lại!'),
    });
  }
}
