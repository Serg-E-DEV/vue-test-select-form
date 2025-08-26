import { DocumentsSchema } from '@/schemas/documents.schema';

export type StaffDocumentType = keyof typeof DocumentsSchema;

export interface StaffDocumentFieldSchema {
  label: string;
  type: 'string' | 'date';
}

export interface StaffDocumentSchema {
  label: string;
  fields: Record<string, StaffDocumentFieldSchema>;
}

export interface StaffDocument {
  id: number;
  type: StaffDocumentType;
  fields: Record<string, string | Date>;
  validated: boolean;
}

export interface staffDocumentsSelectOption {
  value: StaffDocumentType;
  label: string;
}
