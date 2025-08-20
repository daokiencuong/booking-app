export interface MainServiceUpdateRes {
    id: number;
    name: string;
    price: number;
    description: string;
    durationTime: string;
    priceType: 'FIXED' | 'FROM';
    updatedAt: string;
    updatedBy: string;
}