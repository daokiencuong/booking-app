import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayout {
  userName = '';
  constructor(private authService: AuthService,
    private router: Router,
  ) {
    const user = this.authService.getUser();
    this.userName = user?.name || '';
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
