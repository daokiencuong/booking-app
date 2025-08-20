import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceCatalogService } from '../../../core/services/service-catalog-service';
import { MainServiceGet } from '../../../model/response/service/main-service-get.model';
import { ServiceCategoryGet } from '../../../model/response/service/service-category-get.model';
import { AdminSection } from '../../../shared/components/admin-section/admin-section';
import { MainServiceModal } from './components/main-service-modal/main-service-modal';
import { ServiceCategory } from './components/service-category/service-category';

@Component({
  selector: 'service-manage',
  imports: [AdminSection, ServiceCategory, FormsModule, MainServiceModal],
  templateUrl: './service-manage.html',
  styleUrl: './service-manage.css',
})
export class ServiceManage {
  serviceData = signal<ServiceCategoryGet[]>([]);
  // Category modal state
  isCategoryModalOpen = signal<boolean>(false);
  categoryModalMode = signal<'create' | 'edit'>('create');
  categoryFormName = signal<string>('');
  selectedCategoryForEdit = signal<ServiceCategoryGet | null>(null);

  // Main service modal state
  isMainServiceModalOpen = signal<boolean>(false);
  mainServiceModalMode = signal<'detail' | 'create' | 'edit'>('detail');
  selectedMainService = signal<MainServiceGet | null>(null);
  selectedCategoryIdForCreate = signal<number | null>(null);

  constructor(private serviceCatalogService: ServiceCatalogService) {
    this.reload();
  }

  reload() {
    this.serviceCatalogService.getAllServiceForAdmin().subscribe({
      next: (res) => this.serviceData.set(res),
      error: (err) => console.log(err),
    });
  }

  // Category handlers
  openCreateCategoryModal() {
    this.categoryModalMode.set('create');
    this.categoryFormName.set('');
    this.selectedCategoryForEdit.set(null);
    this.isCategoryModalOpen.set(true);
  }

  openEditCategoryModal(category: ServiceCategoryGet) {
    this.categoryModalMode.set('edit');
    this.categoryFormName.set(category.name);
    this.selectedCategoryForEdit.set(category);
    this.isCategoryModalOpen.set(true);
  }

  submitCategoryForm() {
    const mode = this.categoryModalMode();
    const name = this.categoryFormName().trim();
    if (!name) return;

    if (mode === 'create') {
      this.serviceCatalogService.createCategory({ name }).subscribe({
        next: () => {
          this.isCategoryModalOpen.set(false);
          this.reload();
        },
        error: (err) => console.error(err),
      });
    } else {
      const category = this.selectedCategoryForEdit();
      if (!category) return;
      this.serviceCatalogService
        .updateCategory({ id: category.id, name })
        .subscribe({
          next: () => {
            this.isCategoryModalOpen.set(false);
            this.reload();
          },
          error: (err) => console.error(err),
        });
    }
  }

  deleteCategory(categoryId: number) {
    if (
      !confirm('Delete this category? All related services will be affected.')
    ) {
      return;
    }
    this.serviceCatalogService.deleteCategory(categoryId).subscribe({
      next: () => this.reload(),
      error: (err) => console.error(err),
    });
  }

  // Main service handlers
  openCreateMainServiceModal(categoryId: number) {
    this.mainServiceModalMode.set('create');
    this.selectedCategoryIdForCreate.set(categoryId);
    this.selectedMainService.set(null);
    this.isMainServiceModalOpen.set(true);
  }

  openEditMainServiceModal(mainService: MainServiceGet) {
    this.mainServiceModalMode.set('edit');
    this.selectedMainService.set(mainService);
    this.selectedCategoryIdForCreate.set(null);
    this.isMainServiceModalOpen.set(true);
  }

  openDetailMainServiceModal(mainService: MainServiceGet) {
    this.mainServiceModalMode.set('detail');
    this.selectedMainService.set(mainService);
    this.selectedCategoryIdForCreate.set(null);
    this.isMainServiceModalOpen.set(true);
  }

  closeMainServiceModal() {
    this.isMainServiceModalOpen.set(false);
  }

  mainServiceChanged() {
    this.isMainServiceModalOpen.set(false);
    this.reload();
  }

  deleteMainService(mainServiceId: number) {
    if (!confirm('Delete this main service?')) return;
    this.serviceCatalogService.deleteMainService(mainServiceId).subscribe({
      next: () => this.reload(),
      error: (err) => console.error(err),
    });
  }
}
