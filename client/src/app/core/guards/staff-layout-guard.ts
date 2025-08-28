import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';

export const StaffLayoutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getAccoutInfo().pipe(
    map((res) => {
      if (res.user.role === 'MEMBER') {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};
