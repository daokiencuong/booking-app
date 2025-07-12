import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from '../../../core/services/message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  showPassword = false;
  errorMsg = '';
  loading = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.errorMsg = '';
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.data?.user?.role === 'ADMIN') {
          this.messageService.showSuccess('Đăng nhập thành công!');
          this.router.navigate(['/admin']);
        } else if (res.data?.user?.role === 'MEMBER') {
          this.messageService.showSuccess('Đăng nhập thành công!');
          this.router.navigate(['/member']);
        } else {
          this.errorMsg = 'Tài khoản không hợp lệ!';
          this.messageService.showError('Tài khoản không hợp lệ!');
        }
      },
      error: (err) => {
        this.loading = false;
        const errorMessage = err?.error?.message || 'Đăng nhập thất bại!';
        this.errorMsg = errorMessage;
        this.messageService.showError(errorMessage);
      }
    });
  }
} 