import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResultPagination } from '../../model/response/common/result-pagination.model';
import { StaffGet } from '../../model/response/staff/staff-get.model';
import { StaffCreateModel } from '../../model/request/staff/staff-create.model';
import { StaffCreateRes } from '../../model/response/staff/staff-create-res.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private http = inject(HttpClient);

  getAllStaff(): Observable<StaffGet[]> {
    return this.http.get<StaffGet[]>(`${environment.apiUrl}/public/staff`);
  }

  getAllUserForAdmin(
    page: number,
    size: number
  ): Observable<ResultPagination<StaffGet[]>> {
    return this.http.get<ResultPagination<StaffGet[]>>(
      `${environment.apiUrl}/admin/users?page=${page}&size=${size}`
    );
  }

  createNewUser(userData: StaffCreateModel): Observable<StaffCreateRes> {
    return this.http.post<StaffCreateRes>(
      `${environment.apiUrl}/admin/users`,
      userData
    );
  }
}
