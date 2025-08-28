import { inject, Injectable, signal } from '@angular/core';
import { LoginReq } from '../../model/request/auth/login-req.model';
import { Observable } from 'rxjs';
import {
  LoginRes,
  UserInfoRes,
} from '../../model/response/auth/login-res.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(data: LoginReq): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${environment.apiUrl}/auth/login`, data, {
      withCredentials: true,
    });
  }

  logOut(): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  saveAccessToken(token: string) {
    localStorage.setItem('rgnact', token);
  }

  getAccessToken() {
    return localStorage.getItem('rgnact');
  }

  removeAccessToken() {
    localStorage.removeItem('rgnact');
  }

  getAccoutInfo(): Observable<UserInfoRes> {
    return this.http.get<UserInfoRes>(`${environment.apiUrl}/auth/account`);
  }

  refreshToken(): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${environment.apiUrl}/auth/refresh`, {}, {withCredentials: true});
  }
}
