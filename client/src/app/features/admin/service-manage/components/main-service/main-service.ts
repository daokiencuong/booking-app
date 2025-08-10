import { Component, input, signal } from '@angular/core';
import { MainServiceGet } from '../../../../../model/response/service/main-service-get.model';
import { SubService } from "../sub-service/sub-service";

@Component({
  selector: 'app-main-service',
  imports: [SubService],
  templateUrl: './main-service.html',
  styleUrl: './main-service.css'
})
export class MainService {
  isTabOpen = signal<boolean>(false);
  mainService = input.required<MainServiceGet>();

  onClick() {
    this.isTabOpen.update((prevVal) => !prevVal);
  }
}
