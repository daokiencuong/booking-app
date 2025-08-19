import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth-service";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const authToken = authService.authToken();

  if (req.url.startsWith(`${environment.apiUrl}/public/`)) {
    return next(req);
  }

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(newReq);
}
