import { Component, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainServiceGet } from '../../../../../model/response/service/main-service-get.model';
import { ServiceCatalogService } from '../../../../../core/services/service-catalog-service';
import { DurationPipe } from '../../../../../shared/pipes/duration-pipe-pipe';

@Component({
  selector: 'app-main-service-modal',
  imports: [CommonModule, FormsModule, DurationPipe],
  templateUrl: './main-service-modal.html',
  styleUrl: './main-service-modal.css',
})
export class MainServiceModal {
  mode = input<'detail' | 'create' | 'edit'>('detail');
  mainService = input<MainServiceGet | null>(null);
  categoryIdForCreate = input<number | null>(null);

  closed = output<void>();
  changed = output<void>();

  // Main service form state
  formName = signal<string>('');
  formPrice = signal<number>(0);
  formDescription = signal<string>('');
  formDurationMinutes = signal<number>(0);
  formPriceType = signal<'FIXED' | 'FROM'>('FIXED');

  // Sub-service inline form state (detail mode only)
  isSubServiceFormOpen = signal<boolean>(false);
  subFormId = signal<number | null>(null);
  subFormName = signal<string>('');
  subFormPrice = signal<number>(0);
  subFormDurationMinutes = signal<number>(0);
  subFormPriceType = signal<'FIXED' | 'FROM'>('FIXED');

  constructor(private serviceCatalogService: ServiceCatalogService) {
    effect(() => {
      const currentMode = this.mode();
      const ms = this.mainService();
      if (currentMode === 'edit' && ms) {
        this.formName.set(ms.name);
        this.formPrice.set(ms.price);
        this.formDescription.set(ms.description);
        this.formDurationMinutes.set(this.parseIsoDurationToMinutes(ms.durationTime));
        this.formPriceType.set(ms.priceType);
      }
      if (currentMode === 'create') {
        this.formName.set('');
        this.formPrice.set(0);
        this.formDescription.set('');
        this.formDurationMinutes.set(0);
        this.formPriceType.set('FIXED');
      }
    });
  }

  // Helpers
  parseIsoDurationToMinutes(iso: string): number {
    if (!iso) return 0;
    const h = /PT(\d+)H/.exec(iso)?.[1];
    const m = /PT(?:\d+H)?(\d+)M/.exec(iso)?.[1];
    const hours = h ? parseInt(h, 10) : 0;
    const minutes = m ? parseInt(m, 10) : 0;
    return hours * 60 + minutes;
  }

  // Actions
  cancel() {
    this.closed.emit();
  }

  saveMainService() {
    const mode = this.mode();
    if (mode === 'create') {
      const categoryId = this.categoryIdForCreate();
      if (!categoryId) return;
      const payload = {
        name: this.formName().trim(),
        price: this.formPrice(),
        description: this.formDescription().trim(),
        durationTime: this.formDurationMinutes() * 60,
        priceType: this.formPriceType(),
        serviceCategory: { id: categoryId },
      } as const;
      this.serviceCatalogService.createMainService(payload).subscribe({
        next: () => {
          this.changed.emit();
          this.closed.emit();
        },
        error: (err) => console.error(err),
      });
    } else if (mode === 'edit') {
      const ms = this.mainService();
      if (!ms) return;
      const payload = {
        id: ms.id,
        name: this.formName().trim(),
        price: this.formPrice(),
        description: this.formDescription().trim(),
        durationTime: this.formDurationMinutes() * 60,
        priceType: this.formPriceType(),
      } as const;
      this.serviceCatalogService.updateMainService(payload).subscribe({
        next: () => {
          this.changed.emit();
          this.closed.emit();
        },
        error: (err) => console.error(err),
      });
    }
  }

  // Subservice handlers (available in detail mode)
  openCreateSubServiceForm() {
    this.subFormId.set(null);
    this.subFormName.set('');
    this.subFormPrice.set(0);
    this.subFormDurationMinutes.set(0);
    this.subFormPriceType.set('FIXED');
    this.isSubServiceFormOpen.set(true);
  }

  openEditSubServiceForm(sub: { id: number; name: string; price: number; durationTime: string; priceType: 'FIXED' | 'FROM' }) {
    this.subFormId.set(sub.id);
    this.subFormName.set(sub.name);
    this.subFormPrice.set(sub.price);
    this.subFormDurationMinutes.set(this.parseIsoDurationToMinutes(sub.durationTime));
    this.subFormPriceType.set(sub.priceType);
    this.isSubServiceFormOpen.set(true);
  }

  cancelSubServiceForm() {
    this.isSubServiceFormOpen.set(false);
  }

  saveSubService() {
    const ms = this.mainService();
    if (!ms) return;
    const id = this.subFormId();
    const payloadBase = {
      name: this.subFormName().trim(),
      price: this.subFormPrice(),
      durationTime: this.subFormDurationMinutes() * 60,
      priceType: this.subFormPriceType(),
    } as const;
    if (id == null) {
      // create
      this.serviceCatalogService
        .createSubService({ ...payloadBase, mainService: { id: ms.id } })
        .subscribe({
          next: () => {
            this.isSubServiceFormOpen.set(false);
            this.changed.emit();
          },
          error: (err) => console.error(err),
        });
    } else {
      // update
      this.serviceCatalogService
        .updateSubService({ id, ...payloadBase })
        .subscribe({
          next: () => {
            this.isSubServiceFormOpen.set(false);
            this.changed.emit();
          },
          error: (err) => console.error(err),
        });
    }
  }

  deleteSubService(subId: number) {
    if (!confirm('Delete this sub-service?')) return;
    this.serviceCatalogService.deleteSubService(subId).subscribe({
      next: () => this.changed.emit(),
      error: (err) => console.error(err),
    });
  }
}
