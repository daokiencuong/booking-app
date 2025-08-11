import { Component } from '@angular/core';
import { DayPilot, DayPilotModule } from '@daypilot/daypilot-lite-angular';

@Component({
  selector: 'app-calendar-view',
  imports: [DayPilotModule],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.css',
})
export class CalendarView {
  config: DayPilot.SchedulerConfig = {
    startDate: DayPilot.Date.today(),
    days: 1, // hiển thị 1 ngày
    scale: 'Hour',
    cellWidth: 60,
    timeHeaders: [{ groupBy: 'Hour', format: 'h tt' }],
    resources: [], // danh sách nhân viên
    events: [], // danh sách booking
    onEventMoved: (args) => {
      console.log('Moved: ', args);
    },
    onEventResized: (args) => {
      console.log('Resized: ', args);
    },
    onTimeRangeSelected: (args) => {
      const dp = args.control;
      DayPilot.Modal.prompt('Booking name:', '').then((modal) => {
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
        dp.events.add({
          id: DayPilot.guid(),
          text: modal.result,
          start: args.start,
          end: args.end,
          resource: args.resource,
        });
      });
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.loadResources();
    this.loadEvents();
  }

  loadResources() {
    this.config.resources = [
      { name: 'Harry', id: 'h' },
      { name: 'Lion', id: 'l' },
      { name: 'Jenna', id: 'j' },
      { name: 'Lily', id: 'li' },
      { name: 'Anne', id: 'a' },
    ];
  }

  loadEvents() {
    this.config.events = [
      {
        id: '1',
        text: 'Shellac Pedicure',
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(10.75), // 45 phút
        resource: 'h',
      },
      {
        id: '2',
        text: 'Block Time',
        start: DayPilot.Date.today().addHours(9.75),
        end: DayPilot.Date.today().addHours(12),
        resource: 'a',
        backColor: '#999',
      },
    ];
  }
}
