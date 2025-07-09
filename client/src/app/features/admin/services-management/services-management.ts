import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/service/api.service';

@Component({
  selector: 'app-services-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './services-management.html',
  styleUrls: ['./services-management.scss']
})
export class ServicesManagementComponent implements OnInit {
  private api = inject(ApiService);
  services = signal<any[]>([]);
  newService = signal({ name: '', price: 0 });

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.get<any[]>('/api/services').subscribe(data => this.services.set(data));
  }

  addService() {
    this.api.post('/api/services', this.newService()).subscribe(() => {
      this.newService.set({ name: '', price: 0 });
      this.load();
    });
  }

  deleteService(id: string) {
    this.api.delete(`/api/services/${id}`).subscribe(() => this.load());
  }
} 