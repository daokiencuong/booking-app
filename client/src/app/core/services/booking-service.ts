import { inject, Injectable } from '@angular/core';
import { ServiceCategoryGet } from '../../model/response/service/service-category-get.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResultPagination } from '../../model/response/common/result-pagination.model';
import { BookingGetForAdminRes } from '../../model/response/booking/booking-get-for-admin-res.model';
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

  getAllBookingForAdmin(
    bookingDate: string 
  ): Observable<ResultPagination<BookingGetForAdminRes[]>> {
    return this.http.get<ResultPagination<BookingGetForAdminRes[]>>(
      `${environment.apiUrl}/admin/booking?filter=bookingDate:'${bookingDate}'`
    );
  }
}
