export interface MainServiceCreateReq {
  name: string;
  price: number;
  description: string;
  durationTime: number;
  priceType: 'FIXED' | 'FROM';
  serviceCategory: {
    id: number;
  };
}
