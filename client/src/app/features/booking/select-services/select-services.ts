import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from '../../../core/services/booking-service';
import { ServiceCategoryGet } from '../../../model/response/service/service-category-get.model';
import { MainService } from './components/main-service/main-service';

@Component({
  selector: 'app-select-services',
  imports: [CommonModule, MainService],
  templateUrl: './select-services.html',
  styleUrl: './select-services.css',
})
export class SelectServices implements OnInit {
  @ViewChild('categoryBar') categoryBar!: ElementRef<HTMLDivElement>;
  data: ServiceCategoryGet[] = [];
  isReady = signal<boolean>(false);
  activeCategory = signal<number>(0);
  showLeftArrow = signal<boolean>(false);
  showRightArrow = signal<boolean>(true);

  constructor(
    private bookingService: BookingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.bookingService.getAllService().subscribe({
      next: (res) => {
        this.data = res;
        setTimeout(() => {
          this.updateArrows();
        }, 0);
      },
      error: (err) => {
        console.error(err);
        const message =
          err?.error?.message || err?.message || 'Load services failed';
        const error = err?.error?.error || 'Unknown error occurred';
        this.toast.danger(message, error, 3000);
      },
      complete: () => {
        this.isReady.set(true);
      },
    });
  }

  onChangeCategory(categoryIndex: number) {
    this.activeCategory.set(categoryIndex);
  }

  scrollLeft() {
    this.categoryBar.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    setTimeout(() => this.updateArrows(), 300);
  }

  scrollRight() {
    this.categoryBar.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    setTimeout(() => this.updateArrows(), 300);
  }

  updateArrows() {
    const el = this.categoryBar.nativeElement;
    this.showLeftArrow.set(el.scrollLeft > 0);
    this.showRightArrow.set(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 2
    );
  }
}
