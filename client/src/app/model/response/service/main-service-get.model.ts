import { SubServiceGet } from './sub-service-get.model';

export interface MainServiceGet {
  id: number;
  name: string;
  price: number;
  description: string;
  durationTime: string;
  priceType: 'FIXED' | 'FROM';
  subServices: SubServiceGet[];
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}
