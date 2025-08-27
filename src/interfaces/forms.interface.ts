import { StaffDocumentFormField } from '@/interfaces/staff-document.interface';

export interface RecordForm {
  staffNumber: string;
  fullName: string;
}

export type DocumentForm = StaffDocumentFormField[];
