import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MainServiceGet } from '../../model/response/service/main-service-get.model';

interface BookingRequest {
  customerEmail: string;
  customerName: string;
  totalPrice: number;
  bookingDate: string; // dạng "YYYY-MM-DD"
  startTime: string; // dạng "HH:mm:ss"
  durationTime: number; // tính bằng giây
  notes: string;
  staff: {
    id: number;
  };
  mainServices: number[];
  subServices: number[];
}

@Injectable({
  providedIn: 'root',
})
export class BookingStateService {
  private http = inject(HttpClient);
  private toast = inject(NgToastService);

  _mainServiceSelected = signal<MainServiceGet[]>([]);
  mainServiceSelected = this._mainServiceSelected.asReadonly();

  _staffSeleted = signal<{ id: number; name: string }>({
    id: 0,
    name: 'No preference',
  });
  staffSeleted = this._staffSeleted.asReadonly();

  _selectedDate = signal<Date | null>(null);
  selectedDate = this._selectedDate.asReadonly();

  _selectedHour = signal<string>('');
  selectedHour = this._selectedHour.asReadonly();

  _totalActiveStaff = signal<number>(0);
  totalActiveStaff = this._totalActiveStaff.asReadonly();

  setTotalActiveStaff(total: number) {
    this._totalActiveStaff.set(total);
  }

  getTotalService = computed(() => {
    return this.mainServiceSelected().reduce((total, main) => {
      let subPrice = main.subServices.reduce((sum, sub) => sum + 1, 0);
      return total + 1 + subPrice;
    }, 0);
  });

  getTotalPrice = computed(() => {
    return this.mainServiceSelected().reduce((total, main) => {
      let mainPrice = main.price || 0;
      let subPrice = main.subServices.reduce(
        (sum, sub) => sum + (sub.price || 0),
        0
      );
      return total + mainPrice + subPrice;
    }, 0);
  });

  getTotalDuration = computed(() => {
    return this.mainServiceSelected().reduce((total, main) => {
      let mainMinutes = this.parseDuration(main.durationTime);
      let subMinutes = main.subServices.reduce(
        (sum, sub) => sum + this.parseDuration(sub.durationTime),
        0
      );
      return total + mainMinutes + subMinutes;
    }, 0);
  });

  parseDuration(duration: string): number {
    if (!duration) return 0;
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return 0;
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    return hours * 60 + minutes;
  }

  onToggleMainService(data: MainServiceGet) {
    this._mainServiceSelected.update((services) => {
      const exists = services.some((s) => s.id === data.id);
      if (exists) {
        return services.filter((s) => s.id !== data.id);
      } else {
        return [...services, JSON.parse(JSON.stringify(data))];
      }
    });
  }

  onUpdateSubService(data: MainServiceGet) {
    this._mainServiceSelected.update((services) => {
      const idx = services.findIndex((s) => s.id === data.id);
      if (idx !== -1) {
        return services.map((s, i) =>
          i === idx ? JSON.parse(JSON.stringify(data)) : s
        );
      }
      return services;
    });
  }

  isMainServiceSelected(id: number) {
    return this.mainServiceSelected().some((s) => s.id === id);
  }

  isSubServiceSelected(mainServiceId: number, subServiceId: number) {
    const mainService = this.mainServiceSelected().find(
      (s) => s.id === mainServiceId
    );
    return (
      !!mainService &&
      mainService.subServices.some((s) => s.id === subServiceId)
    );
  }

  selectStaff(data: { id: number; name: string }) {
    this._staffSeleted.set(data);
  }

  selectDate(date: Date) {
    this._selectedDate.set(date);
  }

  selectHour(hour: string) {
    this._selectedHour.set(hour);
  }

  createBooking(
    cusName: string,
    cusMail: string,
    cusNotes: string
  ): Observable<any> {
    const bookingData: BookingRequest = {
      customerEmail: cusMail,
      customerName: cusName,
      totalPrice: this.getTotalPrice(),
      bookingDate: this.formatDate(this.selectedDate()) || '', // dạng "YYYY-MM-DD"
      startTime: this.formatHour(this.selectedHour()), // dạng "HH:mm:ss"
      durationTime: this.getTotalDuration() * 60, // tính bằng giây
      notes: cusNotes,
      staff: {
        id: this.staffSeleted().id,
      },
      mainServices: this.getMainServiceIds(this.mainServiceSelected()),
      subServices: this.getSubServiceIds(this.mainServiceSelected()),
    };

    return this.http.post(`${environment.apiUrl}/public/booking`, bookingData);
  }

  formatDate(date: Date | null): string | null {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatHour(time: string): string {
    if (!time) return '';

    const parts = time.split(':');
    if (parts.length === 2) {
      return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}:00`;
    }
    return time;
  }

  getMainServiceIds(services: MainServiceGet[]): number[] {
    return services.map((s) => s.id);
  }

  getSubServiceIds(services: MainServiceGet[]): number[] {
    return services.flatMap((s) => s.subServices.map((sub) => sub.id));
  }
}
