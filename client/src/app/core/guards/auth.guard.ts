import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const token = authService.getToken();
  const user = authService.getUser();

  if (!token || !user) {
    messageService.showError('Vui lòng đăng nhập để truy cập trang này!');
    router.navigate(['/login']);
    return false;
  }

  if (user.role !== 'ADMIN') {
    messageService.showError('Bạn không có quyền truy cập trang này!');
    router.navigate(['/login']);
    return false;
  }

  return true;
}; 