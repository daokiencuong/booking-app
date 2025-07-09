import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../core/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  stats = signal<any>({});

  ngOnInit() {
    this.api.get('/api/dashboard').subscribe(data => this.stats.set(data));
  }

  goto(path: string) {
    this.router.navigate([path]);
  }
} 