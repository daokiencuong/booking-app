import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-select-time',
  imports: [CommonModule],
  templateUrl: './select-time.html',
  styleUrl: './select-time.css',
})
export class SelectTime {
  dates: { month: string; day: number; week: string; date: Date }[] = [];
  selectedDate: any;

  ngOnInit() {
    this.generateDates(90);
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
    console.log(this.selectedDate.date);
  }
}
