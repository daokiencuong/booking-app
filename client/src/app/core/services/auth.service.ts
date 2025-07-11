import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../util/models/api-response.model';
import { RoleEnum } from '../../util/enums/role.enum';

export interface LoginData {
  user: {
    id: number;
    email: string;
    name: string;
    role: RoleEnum;
  };
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<ApiResponse<LoginData>> {
    return this.http.post<ApiResponse<LoginData>>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
      tap(res => {
        if (res.data?.access_token) {
          localStorage.setItem(this.tokenKey, res.data.access_token);
          localStorage.setItem(this.userKey, JSON.stringify(res.data.user));
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
} 