import { MainServiceGet } from './main-service-get.model';

export interface ServiceCategoryGet {
  id: number;
  name: string;
  mainServices: MainServiceGet[];
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}
