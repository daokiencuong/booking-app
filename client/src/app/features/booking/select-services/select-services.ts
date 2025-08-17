import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ServiceCategoryGet } from '../../../model/response/service/service-category-get.model';
import { MainService } from './components/main-service/main-service';
import { BookingService } from '../../../core/services/booking-service';
import { MainServiceGet } from '../../../model/response/service/main-service-get.model';

@Component({
  selector: 'app-select-services',
  imports: [CommonModule, MainService],
  templateUrl: './select-services.html',
  styleUrl: './select-services.css',
})
export class SelectServices implements OnInit {
  @ViewChild('categoryBar') categoryBar!: ElementRef<HTMLDivElement>;
  data: ServiceCategoryGet[] = [];
  activeCategory = signal<number>(0);
  showLeftArrow = false;
  showRightArrow = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getAllService().subscribe((res) => {
      this.data = res;
    });
  }

  onChangeCategory(categoryIndex: number) {
    this.activeCategory.set(categoryIndex);
  }

  ngAfterViewInit() {
    this.updateArrows();
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
    this.showLeftArrow = el.scrollLeft > 0;
    this.showRightArrow = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
  }
}
