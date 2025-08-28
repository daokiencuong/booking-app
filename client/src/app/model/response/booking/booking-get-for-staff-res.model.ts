export interface BookingGetForStaffRes {
    id: number;
    customerName: string;
    totalPrice: number;
    bookingDate: string; // "YYYY-MM-DD"
    startTime: string; // "HH:mm:ss"
    durationTime: string; // ISO-8601 format, ví dụ "PT2H15M"
    endTime: string; // "HH:mm:ss"
    services: ServiceGet[];
  }
  
export interface ServiceGet {
    id: number;
    name: string;
    price: number;
    subServices: SubService[] | null;
  }
  
  interface SubService {
    id: number;
    name: string;
    price: number;
  }
  