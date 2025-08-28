import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, switchMap, throwError } from 'rxjs';
import { LoginRes } from '../../model/response/auth/login-res.model';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authService = inject(AuthService);
  const authToken = authService.getAccessToken();

  if (
    req.url.startsWith(`${environment.apiUrl}/public/`) ||
    req.url == `${environment.apiUrl}/auth/login` ||
    req.url == `${environment.apiUrl}/auth/refresh`
  ) {
    return next(req);
  }

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((res: LoginRes) => {
            const newToken = res.access_token;
            authService.saveAccessToken(newToken);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            authService.logOut();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
}
