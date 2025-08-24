export interface BookingGetForAdminRes {
  id: number;
  customerEmail: string;
  customerName: string;
  totalPrice: number;
  bookingDate: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm:ss"
  durationTime: string; // ISO-8601 format, ví dụ "PT2H15M"
  endTime: string; // "HH:mm:ss"
  createdAt: string; // ISO datetime
  staff: Staff;
  services: Service[];
}

interface Staff {
  id: number;
  name: string;
}

interface Service {
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
