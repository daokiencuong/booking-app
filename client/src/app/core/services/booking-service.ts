import { computed, inject, Injectable, signal } from '@angular/core';
import { ServiceCategoryGet } from '../../model/response/service/service-category-get.model';
import { MainServiceGet } from '../../model/response/service/main-service-get.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from '../../model/response/common/rest-response.model';
import { environment } from '../../../environments/environment';
import { StaffService } from './staff-service';
import { TimeService } from './time-service';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);

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

  getAllService(): Observable<ServiceCategoryGet[]> {
    return this.http.get<ServiceCategoryGet[]>(
      `${environment.apiUrl}/public/service`
    );
  }

  getAllServiceForAdmin(): Observable<ServiceCategoryGet[]> {
    return this.http.get<ServiceCategoryGet[]>(
      `${environment.apiUrl}/admin/service`
    );
  }
}
