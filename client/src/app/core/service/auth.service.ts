import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(localStorage.getItem('token'));
  private _role = signal<string | null>(localStorage.getItem('role'));

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string; role: string }>('/api/auth/login', { username, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this._token.set(res.token);
        this._role.set(res.role);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this._token.set(null);
    this._role.set(null);
    this.router.navigate(['/auth']);
  }

  get token() {
    return this._token();
  }

  get role() {
    return this._role();
  }

  isLoggedIn() {
    return !!this._token();
  }
} 