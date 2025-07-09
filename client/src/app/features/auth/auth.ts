import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class AuthComponent {
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);
  private router = inject(Router);

  username = '';
  password = '';
  loading = signal(false);

  login() {
    this.loading.set(true);
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.snack.open('Đăng nhập thành công!');
        const role = this.auth.role;
        if (role === 'owner') this.router.navigate(['/admin']);
        else if (role === 'staff') this.router.navigate(['/staff']);
        else this.router.navigate(['/']);
      },
      error: () => {
        this.snack.open('Sai tài khoản hoặc mật khẩu!');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
