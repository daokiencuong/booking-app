import { Component, inject, signal } from '@angular/core';
import { AdminSection } from '../../../shared/components/admin-section/admin-section';
import { ServiceCategory } from './components/service-category/service-category';
import { ServiceCategoryGet } from '../../../model/response/service/service-category-get.model';
import { BookingService } from '../../../core/services/booking-service';

@Component({
  selector: 'service-manage',
  imports: [AdminSection, ServiceCategory],
  templateUrl: './service-manage.html',
  styleUrl: './service-manage.css',
})
export class ServiceManage {
  serviceData = signal<ServiceCategoryGet[]>([]);

  constructor(private bookingService: BookingService) {
    this.bookingService.getAllServiceForAdmin().subscribe({
      next: (res) => {
        this.serviceData.set(res);
      },
      error: (err) => console.log(err),
    });
  }
}
