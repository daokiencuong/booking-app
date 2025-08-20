export interface SubServiceCreateReq {
  name: string;
  price: number;
  durationTime: number;
  priceType: 'FIXED' | 'FROM';
  mainService: {
    id: number;
  };
}