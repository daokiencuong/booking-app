export interface SubServiceGet {
  id: number;
  name: string;
  price: number;
  durationTime: string;
  priceType: 'FIXED' | 'FROM';
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}
