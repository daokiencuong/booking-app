import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../core/services/booking-service';
import { BookingGetForAdminRes } from '../../../model/response/booking/booking-get-for-admin-res.model';
import { AdminSection } from '../../../shared/components/admin-section/admin-section';
import { GantChart } from "./gant-chart/gant-chart";

interface StaffRow {
  id: number;
  name: string;
}

interface GanttTableCell {
  type: 'gap' | 'booking';
  colspan: number;
  booking?: BookingGetForAdminRes;
}

interface VerticalCellSpec {
  type: 'gap' | 'booking' | 'skip';
  rowspan?: number;
  booking?: BookingGetForAdminRes;
  staffId: number;
}

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSection, GantChart],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.css',
})
export class CalendarView implements OnInit {
  selectedDate: string = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  bookings: BookingGetForAdminRes[] = [];
  staffRows: StaffRow[] = [];
  loading: boolean = false;
  selectedBooking: BookingGetForAdminRes | null = null;
  showModal: boolean = false;

  // Timeline config
  readonly startHour: number = 9;
  readonly endHour: number = 20;
  readonly slotMinutes: number = 15;

  timeSlots: string[] = []; // 15-min ticks
  totalSlots: number = 0;

  // Precomputed table cells per staff (for colspan rendering)
  private rowCellsMap: Map<number, GanttTableCell[]> = new Map();

  // Precomputed vertical grid (time rows x staff columns)
  verticalRows: VerticalCellSpec[][] = [];

  constructor(private bookingService: BookingService) {
    this.generateTimeSlots();
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  generateTimeSlots() {
    this.timeSlots = [];
    const startMinutes = this.startHour * 60;
    const endMinutes = this.endHour * 60;
    for (let m = startMinutes; m < endMinutes; m += this.slotMinutes) {
      this.timeSlots.push(this.formatMinutesToHHMM(m));
    }
    this.totalSlots = this.timeSlots.length;
  }

  loadBookings() {
    this.loading = true;
    this.bookingService.getAllBookingForAdmin(this.selectedDate).subscribe({
      next: (response) => {
        this.bookings = response.result || [];
        this.buildStaffRowsFromBookings();
        this.buildRowCells();
        this.buildVerticalCells();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.bookings = [];
        this.staffRows = [];
        this.rowCellsMap.clear();
        this.verticalRows = [];
        this.loading = false;
      },
    });
  }

  onDateChange() {
    this.loadBookings();
  }

  buildStaffRowsFromBookings() {
    const map = new Map<number, string>();
    for (const b of this.bookings) {
      if (!map.has(b.staff.id)) {
        map.set(b.staff.id, b.staff.name);
      }
    }
    this.staffRows = Array.from(map.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  }

  bookingsForStaff(staffId: number): BookingGetForAdminRes[] {
    return this.bookings.filter((b) => b.staff.id === staffId);
  }

  // Build table cells (with colspans) per staff
  private buildRowCells(): void {
    this.rowCellsMap.clear();
    for (const staff of this.staffRows) {
      const cells = this.buildRowCellsForStaff(staff.id);
      this.rowCellsMap.set(staff.id, cells);
    }
  }

  private buildRowCellsForStaff(staffId: number): GanttTableCell[] {
    const bookings = this.bookingsForStaff(staffId).slice();
    // Sort by start time
    bookings.sort(
      (a, b) =>
        this.parseTimeToMinutes(a.startTime) -
        this.parseTimeToMinutes(b.startTime)
    );

    let pointer = 0; // current slot index
    const cells: GanttTableCell[] = [];

    for (const b of bookings) {
      const startIdx = this.getStartSlotIndex(b.startTime);
      const endIdx = this.getEndSlotIndex(b.endTime);
      if (endIdx <= startIdx) {
        continue;
      }

      if (startIdx > pointer) {
        cells.push({ type: 'gap', colspan: startIdx - pointer });
      }

      cells.push({ type: 'booking', colspan: endIdx - startIdx, booking: b });
      pointer = endIdx;
    }

    if (pointer < this.totalSlots) {
      cells.push({ type: 'gap', colspan: this.totalSlots - pointer });
    }

    return cells;
  }

  getRowCells(staffId: number): GanttTableCell[] {
    return this.rowCellsMap.get(staffId) || [];
  }

  // Build time-rows x staff-columns grid with rowspans
  private buildVerticalCells(): void {
    const numRows = this.totalSlots;
    const numCols = this.staffRows.length;

    // Initialize with gaps
    const grid: VerticalCellSpec[][] = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, (_, colIdx) => ({
        type: 'gap',
        staffId: this.staffRows[colIdx]?.id ?? -1,
      }))
    );

    for (let col = 0; col < numCols; col++) {
      const staffId = this.staffRows[col].id;
      const bookings = this.bookingsForStaff(staffId)
        .slice()
        .sort(
          (a, b) =>
            this.parseTimeToMinutes(a.startTime) -
            this.parseTimeToMinutes(b.startTime)
        );

      for (const b of bookings) {
        const startIdx = this.getStartSlotIndex(b.startTime);
        const endIdx = this.getEndSlotIndex(b.endTime);
        if (endIdx <= startIdx) continue;

        // If any portion already covered by a prior booking, skip overlapping part
        // Find the first free row >= startIdx
        let placeStart = startIdx;
        while (
          placeStart < endIdx &&
          grid[placeStart][col] &&
          grid[placeStart][col].type !== 'gap'
        ) {
          placeStart++;
        }
        if (placeStart >= endIdx) continue;

        // Determine continuous free span
        let placeEnd = placeStart + 1;
        while (
          placeEnd < endIdx &&
          grid[placeEnd][col] &&
          grid[placeEnd][col].type === 'gap'
        ) {
          placeEnd++;
        }

        const span = Math.max(1, placeEnd - placeStart);

        grid[placeStart][col] = {
          type: 'booking',
          rowspan: span,
          booking: b,
          staffId,
        };
        for (let r = placeStart + 1; r < placeStart + span; r++) {
          grid[r][col] = { type: 'skip', staffId };
        }
      }
    }

    this.verticalRows = grid;
  }

  // Slot index helpers (shared)
  private getStartSlotIndex(time: string): number {
    const minutes = this.parseTimeToMinutes(time);
    const start = this.startHour * 60;
    const end = this.endHour * 60;
    const clamped = Math.max(start, Math.min(end, minutes));
    const idx = Math.floor((clamped - start) / this.slotMinutes);
    return Math.max(0, Math.min(this.totalSlots, idx));
  }

  private getEndSlotIndex(time: string): number {
    const minutes = this.parseTimeToMinutes(time);
    const start = this.startHour * 60;
    const end = this.endHour * 60;
    const clamped = Math.max(start, Math.min(end, minutes));
    const idx = Math.ceil((clamped - start) / this.slotMinutes);
    return Math.max(0, Math.min(this.totalSlots, idx));
  }

  openBookingDetail(booking: BookingGetForAdminRes) {
    this.selectedBooking = booking;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBooking = null;
  }

  formatTime(timeString: string): string {
    const m = this.parseTimeToMinutes(timeString);
    return this.formatMinutesToHHMM(m);
  }

  // Helpers
  private parseTimeToMinutes(time: string): number {
    // Supports "HH:mm:ss" or "HH:mm"
    const parts = time.split(':');
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    return h * 60 + m;
  }

  private formatMinutesToHHMM(totalMinutes: number): string {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  getServiceNames(services: any[]): string {
    if (!services || services.length === 0) return 'Không có dịch vụ';
    return services.map((s: any) => s.name).join(', ');
  }

  formatDuration(duration: string): string {
    if (!duration) return '';
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}p`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}p`;
    return duration;
  }
}
