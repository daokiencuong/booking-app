import { Injectable, inject, signal } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BookingStateService } from './booking-state-service';
import { BookingService } from './booking-service';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private http = inject(HttpClient);
  private bookingStateService = inject(BookingStateService);
  private bookingService = inject(BookingService);
  private slotDuration = 15;

  getWorkSchedule(): Observable<
    { id: number; day: string; openTime: string; closeTime: string }[]
  > {
    return this.http.get<
      {
        id: number;
        day: string;
        openTime: string;
        closeTime: string;
      }[]
    >(`${environment.apiUrl}/public/working-schedule`);
  }

  getAllTimeSlots(date: Date): Observable<{ time: string; booked: boolean }[]> {
    const dayOfWeek = date
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toUpperCase();
    // ví dụ: MONDAY, TUESDAY...

    return this.getWorkSchedule().pipe(
      switchMap((schedules: any[]) => {
        // tìm schedule của đúng ngày
        const schedule = schedules.find((s) => s.day === dayOfWeek);
        if (!schedule) {
          return of([]); // nếu không có ca làm thì trả về empty
        }

        const staffId = this.bookingStateService.staffSeleted().id;
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

        return this.bookingService
          .getBookingsByStaffIdAndDate(staffId, dateStr)
          .pipe(
            map((bookings) => {
              // generate slots dựa trên ca làm + bookings
              return this.buildTimeSlots(
                schedule.openTime,
                schedule.closeTime,
                bookings,
                dateStr
              );
            })
          );
      })
    );
  }

  private buildTimeSlots(
    openTime: string,
    closeTime: string,
    bookings: {
      staffId: number;
      bookingDate: string;
      startTime: string;
      endTime: string;
    }[],
    dateStr: string
  ): { time: string; booked: boolean }[] {
    const slots: { time: string; booked: boolean }[] = [];
    const duration = this.bookingStateService.getTotalDuration();

    const today = new Date();

    let current: number;
    if (dateStr && this.isSameDateStr(dateStr, today)) {
      const nowMinutes = today.getHours() * 60 + today.getMinutes();
      const rounded = Math.ceil(nowMinutes / 15) * 15;
      current = Math.max(rounded, this.toMinutes(openTime));
    } else {
      current = this.toMinutes(openTime);
    }

    // --- end new code ---

    const end = this.toMinutes(closeTime);

    while (current < end) {
      const time = this.toTimeString(current);
      const booked = bookings.some(
        (b) =>
          (current >= this.toMinutes(b.startTime) &&
            current < this.toMinutes(b.endTime)) ||
          (current + duration >= this.toMinutes(b.endTime) &&
            current <= this.toMinutes(b.startTime)) ||
          (current + duration > this.toMinutes(b.startTime) &&
            current + duration <= this.toMinutes(b.endTime))
      );
      slots.push({ time, booked });
      current += this.slotDuration;
    }

    return slots;
  }

  private toMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  private toTimeString(minutes: number): string {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  private isSameDateStr(dateStr: string, d: Date): boolean {
    const [year, month, day] = dateStr.split('-').map(Number);
    return (
      d.getFullYear() === year &&
      d.getMonth() + 1 === month &&
      d.getDate() === day
    );
  }
}
