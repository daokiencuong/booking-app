import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StaffCreateModel } from '../../model/request/staff/staff-create.model';
import { ResultPagination } from '../../model/response/common/result-pagination.model';
import { StaffCreateRes } from '../../model/response/staff/staff-create-res.model';
import { StaffGet } from '../../model/response/staff/staff-get.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private http = inject(HttpClient);
  private toast = inject(NgToastService);

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
    return this.http
      .post<StaffCreateRes>(`${environment.apiUrl}/admin/users`, userData)
      .pipe(
        tap(() => {
          this.toast.success('User created successfully', 'Success', 3000);
        })
      );
  }
}
