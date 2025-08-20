export interface SubServiceUpdateReq {
    id: number;
    name: string;
    price: number;
    durationTime: number;
    priceType: 'FIXED' | 'FROM';
}