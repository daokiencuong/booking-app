export interface StaffModel {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  description: string;
  staffActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
