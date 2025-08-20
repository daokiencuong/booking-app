export interface SubServiceCreateRes {
    id: number;
    name: string;
    price: number;
    durationTime: string;
    priceType: 'FIXED' | 'FROM';
    mainService: {
        id: number;
        name: string;
    };
    createdAt: string;
    createdBy: string;
}