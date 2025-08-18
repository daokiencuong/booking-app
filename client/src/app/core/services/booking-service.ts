import { computed, inject, Injectable, signal } from '@angular/core';
import { ServiceCategoryGet } from '../../model/response/service/service-category-get.model';
import { MainServiceGet } from '../../model/response/service/main-service-get.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from '../../model/response/common/rest-response.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);
  mainServiceSelected = signal<MainServiceGet[]>([]);
  getAllSeviceSelected = this.mainServiceSelected.asReadonly();

  _totalDurationMinute = signal<number>(0);
  totalDurationMinute = this._totalDurationMinute.asReadonly();

  getTotalService = computed(() => {
    return this.getAllSeviceSelected().reduce((total, main) => {
      let subPrice = main.subServices.reduce((sum, sub) => sum + 1, 0);
      return total + 1 + subPrice;
    }, 0);
  });

  getTotalPrice = computed(() => {
    return this.getAllSeviceSelected().reduce((total, main) => {
      let mainPrice = main.price || 0;
      let subPrice = main.subServices.reduce(
        (sum, sub) => sum + (sub.price || 0),
        0
      );
      return total + mainPrice + subPrice;
    }, 0);
  });

  getTotalDuration = computed(() => {
    return this.getAllSeviceSelected().reduce((total, main) => {
      let mainMinutes = this.parseDuration(main.durationTime);
      let subMinutes = main.subServices.reduce(
        (sum, sub) => sum + this.parseDuration(sub.durationTime),
        0
      );
      return total + mainMinutes + subMinutes;
    }, 0);
  });

  getBookingsByStaffIdAndDate(
    staffId: number,
    date: string
  ): Observable<
    {
      staffId: number;
      bookingDate: string;
      startTime: string;
      endTime: string;
    }[]
  > {
    return this.http.post<
      {
        staffId: number;
        bookingDate: string;
        startTime: string;
        endTime: string;
      }[]
    >(`${environment.apiUrl}/public/time-booking`, {
      staffId: staffId,
      bookingDate: date,
    });
  }

  parseDuration(duration: string): number {
    if (!duration) return 0;
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return 0;
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    return hours * 60 + minutes;
  }

  getAllService(): Observable<ServiceCategoryGet[]> {
    return this.http.get<ServiceCategoryGet[]>(
      `${environment.apiUrl}/public/service`
    );
  }

  onToggleMainService(data: MainServiceGet) {
    this.mainServiceSelected.update((services) => {
      const exists = services.some((s) => s.id === data.id);
      if (exists) {
        return services.filter((s) => s.id !== data.id);
      } else {
        return [...services, JSON.parse(JSON.stringify(data))];
      }
    });
  }

  onUpdateSubService(data: MainServiceGet) {
    this.mainServiceSelected.update((services) => {
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
}
