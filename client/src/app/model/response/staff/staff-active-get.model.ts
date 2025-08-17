export interface StaffActiveGet {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER'; 
  description: string;
  staffActive: boolean;
  createdAt: string;   
  updatedAt: string | null;   
  createdBy: string;
  updatedBy: string | null;
}
