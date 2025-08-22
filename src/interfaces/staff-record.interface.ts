import { StaffDocument } from '@/interfaces/staff-document.interface';

export interface StaffRecord {
  id: number;
  staffNumber: string;
  fullName: string;
  staffDocuments: StaffDocument[];
  validated: boolean;
}
