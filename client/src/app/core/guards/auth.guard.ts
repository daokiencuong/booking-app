import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const user = authService.getUser();

  if (!token || !user) {
    router.navigate(['/login']);
    return false;
  }

  if (user.role !== 'ADMIN') {
    router.navigate(['/login']);
    return false;
  }

  return true;
}; 