import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../core/services/auth-service';
import { LoginReq } from '../../../model/request/auth/login-req.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  authService = inject(AuthService);
  toast = inject(NgToastService);
  router = inject(Router);

  ngOnInit(): void {
      this.authService.getAccoutInfo().subscribe({
        next: (res) => {
        if (res.user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/staff']);
        }
      },
      })
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const loginData: LoginReq = {
      email: this.loginForm.value?.email || '',
      password: this.loginForm.value?.password || '',
    };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.authService.saveAccessToken(res.access_token);
        if (res.user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/staff']);
        }
      },
      error: (err) => {
        const message = err?.error?.message || err?.message || 'Login failed';
        const error = err?.error?.error || 'Unknown error occurred';
        this.toast.danger(message, error, 3000);
      },
    });
  }
}
