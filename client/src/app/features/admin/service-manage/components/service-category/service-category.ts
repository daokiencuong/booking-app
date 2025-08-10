import { Component, input, signal } from '@angular/core';
import { ServiceCategoryGet } from '../../../../../model/response/service/service-category-get.model';
import { MainService } from '../main-service/main-service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-category',
  imports: [MainService, DatePipe, CommonModule],
  templateUrl: './service-category.html',
  styleUrl: './service-category.css'
})
export class ServiceCategory {
  isTabOpen = signal<boolean>(false);
  category = input.required<ServiceCategoryGet>();

  onClick() {
    this.isTabOpen.update((prevVal) => !prevVal);
  }
}
