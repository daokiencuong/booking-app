import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ServiceCategoryGet } from '../../../model/response/service/service-category-get.model';
import { MainService } from "./components/main-service/main-service";
import { BookingService } from '../../../core/services/booking-service';

@Component({
  selector: 'app-select-services',
  imports: [CommonModule, MainService],
  templateUrl: './select-services.html',
  styleUrl: './select-services.css',
})
export class SelectServices implements OnInit{
  @ViewChild('serviceList') serviceList!: ElementRef;
  @ViewChildren('categorySection') categorySections!: QueryList<ElementRef>;
  mockdata: ServiceCategoryGet[] = [];
  activeCategory!: number;

  constructor(private bookingService: BookingService){}

  ngOnInit(): void {
      this.mockdata = this.bookingService.getAllService();
      this.activeCategory = this.mockdata[0].id;
  }
  
  scrollToCategory(id: number) {
    if (id !== undefined) {
      const elId = String(id);
      const el = document.getElementById(elId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  onScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    for (let cat of this.mockdata) {
      if (cat?.id !== undefined) {
        const elId = String(cat.id);
        const el = document.getElementById(elId);
        if (el && el.offsetTop - 60 <= scrollTop) {
          this.activeCategory = cat.id + 1;
        }
      }
    }
  }
}
