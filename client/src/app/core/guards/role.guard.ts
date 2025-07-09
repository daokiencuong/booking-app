import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export function RoleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.isLoggedIn() || !allowedRoles.includes(auth.role || '')) {
      router.navigate(['/auth']);
      return false;
    }
    return true;
  };
} 