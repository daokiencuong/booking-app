import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffActiveGet } from '../../model/response/staff/staff-active-get.model';
import { environment } from '../../../environments/environment';
import { TimeService } from './time-service';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private http = inject(HttpClient);
  _staffSeletedId = signal<number>(0);
  staffSeletedId = this._staffSeletedId.asReadonly();

  selectStaff(id: number) {
    this._staffSeletedId.set(id);
  }

  getAllStaff(): Observable<StaffActiveGet[]> {
    return this.http.get<StaffActiveGet[]>(
      `${environment.apiUrl}/public/staff`
    );
  }
}
