import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBarComponent {
  authService = inject(AuthService);
  toast = inject(NgToastService);
  router = inject(Router);

  onLogOut() {
    this.authService.logOut().subscribe({
      error: (err) => {
        const message = err?.error?.message || err?.message || 'Logout failed';
        const error = err?.error?.error || 'Unknown error occurred';
        this.toast.danger(message, error, 3000);
      },
      complete: () => {
        this.authService.removeAccessToken();
        this.router.navigate(['/login']);
      },
    });
  }
}
