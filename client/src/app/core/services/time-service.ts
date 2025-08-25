import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BookingService } from './booking-service';
import { BookingStateService } from './booking-state-service';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private http = inject(HttpClient);
  private bookingStateService = inject(BookingStateService);
  private bookingService = inject(BookingService);
  private toast = inject(NgToastService);
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

    return this.getWorkSchedule().pipe(
      switchMap((schedules: any[]) => {
        // tìm schedule của đúng ngày
        const schedule = schedules.find((s) => s.day === dayOfWeek);
        if (!schedule) {
          return of([]);
        }

        const staffId = this.bookingStateService.staffSeleted().id;
        const dateStr = date.toISOString().split('T')[0];

        return this.bookingService
          .getBookingsByStaffIdAndDate(staffId, dateStr)
          .pipe(
            map((bookings) => {
              return this.buildTimeSlots(
                schedule.openTime,
                schedule.closeTime,
                bookings,
                dateStr,
                staffId
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
    dateStr: string,
    staffId: number
  ): { time: string; booked: boolean }[] {
    const slots: { time: string; booked: boolean }[] = [];
    const duration = this.bookingStateService.getTotalDuration();
    const totalStaff = this.bookingStateService.totalActiveStaff();
    const today = new Date();

    let current: number;
    if (dateStr && this.isSameDateStr(dateStr, today)) {
      const nowMinutes = today.getHours() * 60 + today.getMinutes();
      const rounded = Math.ceil(nowMinutes / 15) * 15;
      current = Math.max(rounded, this.toMinutes(openTime));
    } else {
      current = this.toMinutes(openTime);
    }

    const end = this.toMinutes(closeTime);

    if (staffId === 0) {
      while (current < end) {
        const time = this.toTimeString(current);

        const busyStaff = new Set<number>();

        bookings.forEach((b) => {
          if (
            (current >= this.toMinutes(b.startTime) &&
              current < this.toMinutes(b.endTime)) ||
            (current + duration > this.toMinutes(b.startTime) &&
              current < this.toMinutes(b.endTime))
          ) {
            busyStaff.add(b.staffId);
          }
        });

        const booked = busyStaff.size >= totalStaff;
        slots.push({ time, booked });

        current += this.slotDuration;
      }

      return slots;
    }

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
