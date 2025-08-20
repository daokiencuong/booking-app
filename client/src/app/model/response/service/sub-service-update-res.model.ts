export interface SubServiceUpdateRes {
    id: number;
    name: string;
    price: number;
    durationTime: string;
    priceType: 'FIXED' | 'FROM';
    updatedAt: string;
    updatedBy: string;
}