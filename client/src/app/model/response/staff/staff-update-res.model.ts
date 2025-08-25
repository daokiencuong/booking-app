export interface StaffUpdateRes {
  id: number;
  name: string;
  email: string;
  updatedAt: string;
  updatedBy: string;
  role: 'ADMIN' | 'MEMBER';
  description: string;
  staffActive: boolean;
}
