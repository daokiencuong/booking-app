import { Component, input } from '@angular/core';
import { SubServiceGet } from '../../../../../model/response/service/sub-service-get.model';

@Component({
  selector: 'app-sub-service',
  imports: [],
  templateUrl: './sub-service.html',
  styleUrl: './sub-service.css'
})
export class SubService {
  subService = input.required<SubServiceGet>();
}
