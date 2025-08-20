export interface MainServiceCreateRes {
    id: number;
    name: string;
    price: number;
    description: string;
    durationTime: string;
    priceType: 'FIXED' | 'FROM';
    serviceCategory: {
        id: number;
        name: string;
    };
    createdAt: string;
    createdBy: string;
}