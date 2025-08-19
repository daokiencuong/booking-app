import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _authToken = signal<string>('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInBlcm1pc3Npb24iOiJBRE1JTiIsImV4cCI6MTc1NTg2OTExNSwiaWF0IjoxNzU1NjA5OTE1LCJ1c2VyIjp7ImlkIjo0LCJlbWFpbCI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwibmFtZSI6InN1cGVyYWRtaW4iLCJyb2xlIjoiQURNSU4ifX0.YA9SEhflCvFBIoItx6n3SJEgKDftTpdfvLcPWF1ti5A');
  authToken = this._authToken.asReadonly();
}
