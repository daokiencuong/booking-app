import { Component } from '@angular/core';
import { MainServiceGet } from '../../../../../model/response/service/main-service-get.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-service-modal',
  imports: [CommonModule],
  templateUrl: './main-service-modal.html',
  styleUrl: './main-service-modal.css',
})
export class MainServiceModal {
  mainService: MainServiceGet = {
    id: 6,
    name: 'Brightening Facial',
    price: 105.0,
    description: 'Facial treatment to even skin tone and restore radiance.',
    durationTime: 'PT1H',
    priceType: 'FIXED',
    subServices: [
      {
        id: 1,
        name: 'Beard Trim & Styling',
        price: 25.0,
        durationTime: 'PT15M',
        priceType: 'FIXED',
        createdAt: '2025-08-09T14:16:03.839412Z',
        createdBy: 'daokiencuong04@gmail.com',
        updatedAt: null,
        updatedBy: null,
      },
      {
        id: 2,
        name: 'Classic Haircut',
        price: 30.0,
        durationTime: 'PT30M',
        priceType: 'FIXED',
        createdAt: '2025-08-09T14:16:28.925262Z',
        createdBy: 'daokiencuong04@gmail.com',
        updatedAt: null,
        updatedBy: null,
      },
      {
        id: 8,
        name: 'Men’s Hair Styling',
        price: 27.0,
        durationTime: 'PT20M',
        priceType: 'FIXED',
        createdAt: '2025-08-09T14:17:08.664803Z',
        createdBy: 'daokiencuong04@gmail.com',
        updatedAt: null,
        updatedBy: null,
      },
      {
        id: 10,
        name: 'Moustache Grooming',
        price: 15.0,
        durationTime: 'PT10M',
        priceType: 'FIXED',
        createdAt: '2025-08-09T14:17:20.481251Z',
        createdBy: 'daokiencuong04@gmail.com',
        updatedAt: null,
        updatedBy: null,
      },
    ],
    createdAt: '2025-08-09T14:15:25.677222Z',
    createdBy: 'daokiencuong04@gmail.com',
    updatedAt: null,
    updatedBy: null,
  };
}
