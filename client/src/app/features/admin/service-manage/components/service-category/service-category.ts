import { Component, input, signal } from '@angular/core';
import { ServiceCategoryGet } from '../../../../../model/response/service/service-category-get.model';
import { CommonModule, DatePipe } from '@angular/common';
import { DurationPipe } from '../../../../../shared/pipes/duration-pipe-pipe';

@Component({
  selector: 'app-service-category',
  imports: [DatePipe, CommonModule, DurationPipe],
  templateUrl: './service-category.html',
  styleUrl: './service-category.css'
})
export class ServiceCategory {
  isTabOpen = signal<boolean>(true);
  category = input.required<ServiceCategoryGet>();

  onClick() {
    this.isTabOpen.update((prevVal) => !prevVal);
  }
}
