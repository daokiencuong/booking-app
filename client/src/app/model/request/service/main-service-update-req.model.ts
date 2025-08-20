export interface MainServiceUpdateReq {
    id: number;
    name: string;
    price: number;
    description: string;
    durationTime: number;
    priceType: 'FIXED' | 'FROM';
}