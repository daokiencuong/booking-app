import { Component, input, output, signal } from '@angular/core';
import { ServiceCategoryGet } from '../../../../../model/response/service/service-category-get.model';
import { MainServiceGet } from '../../../../../model/response/service/main-service-get.model';
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
  // Outputs for parent actions
  editCategory = output<ServiceCategoryGet>();
  deleteCategory = output<number>();
  createMainService = output<number>();
  editMainService = output<MainServiceGet>();
  detailMainService = output<MainServiceGet>();
  deleteMainService = output<number>();

  onClick() {
    this.isTabOpen.update((prevVal) => !prevVal);
  }

  onCreateMainService(event: Event) {
    event.stopPropagation();
    this.createMainService.emit(this.category().id);
  }

  onEditCategory(event: Event) {
    event.stopPropagation();
    this.editCategory.emit(this.category());
  }

  onDeleteCategory(event: Event) {
    event.stopPropagation();
    this.deleteCategory.emit(this.category().id);
  }
}
