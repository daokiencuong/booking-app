import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TimeService } from '../../../core/services/time-service';
import { single } from 'rxjs';

@Component({
  selector: 'app-select-time',
  imports: [CommonModule],
  templateUrl: './select-time.html',
  styleUrl: './select-time.css',
})
export class SelectTime {
  private timeService = inject(TimeService);
  dates: { month: string; day: number; week: string; date: Date }[] = [];
  selectedDate: any;
  isLoading = signal<boolean>(true);
  times = signal<{ time: string; booked: boolean }[]>([]);
  selectedHour = signal<string>('');

  ngOnInit() {
    this.generateDates(90);
    this.selectedDate = this.dates[0];
    this.selectDate(this.dates[0]);
  }

  generateDates(days: number) {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'short' }; // Aug
    const weekOptions: Intl.DateTimeFormatOptions = { weekday: 'short' }; // Sun

    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      this.dates.push({
        month: d.toLocaleDateString('en-US', options),
        day: d.getDate(),
        week: d.toLocaleDateString('en-US', weekOptions),
        date: d,
      });
    }
  }

  selectDate(d: any) {
    this.selectedDate = d;
    this.timeService.getAllTimeSlots(d.date).subscribe({
      next: (res) => {
        this.times.set(res);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  selectHour(hour: string) {
    this.selectedHour.set(hour);
    console.log(this.selectedHour());
  }
}
