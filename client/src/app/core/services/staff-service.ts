import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StaffCreateModel } from '../../model/request/staff/staff-create.model';
import { ResultPagination } from '../../model/response/common/result-pagination.model';
import { StaffCreateRes } from '../../model/response/staff/staff-create-res.model';
import { StaffGet } from '../../model/response/staff/staff-get.model';
import { StaffUpdateReq } from '../../model/request/staff/staff-update-req.model';
import { StaffUpdateRes } from '../../model/response/staff/staff-update-res.model';
import { StaffUpdatePasswordForceReq } from '../../model/request/staff/staff-update-password-force-req.model';
import { StaffUpdatePasswordForceRes } from '../../model/response/staff/staff-update-password-force-res.model';

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
    size: number,
    nameSearch: string
  ): Observable<ResultPagination<StaffGet[]>> {
    return this.http.get<ResultPagination<StaffGet[]>>(
      `${environment.apiUrl}/admin/users?page=${page}&size=${size}&filter=name~'${nameSearch}'`
    );
  }

  getUserInfo(): Observable<StaffGet> {
    return this.http.get<StaffGet>(`${environment.apiUrl}/common/users`);
  }

  createNewUser(userData: StaffCreateModel): Observable<StaffCreateRes> {
    return this.http.post<StaffCreateRes>(
      `${environment.apiUrl}/admin/users`,
      userData
    );
  }

  updateUserInfo(userData: StaffUpdateReq): Observable<StaffUpdateRes> {
    return this.http.put<StaffUpdateRes>(
      `${environment.apiUrl}/common/users`,
      userData
    );
  }

  changeForcePassword(
    data: StaffUpdatePasswordForceReq
  ): Observable<StaffUpdatePasswordForceRes> {
    return this.http.put<StaffUpdatePasswordForceRes>(
      `${environment.apiUrl}/admin/users/change-pass-force`,
      data
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/admin/users/${userId}`
    );
  }
}
