import { documentsSchema } from '@/schemas/documents.schema';

export type StaffDocumentType = keyof typeof documentsSchema;

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
  fields: Record<string, string>;
  validated: boolean;
}

export interface StaffDocumentsSelectOption {
  value: StaffDocumentType;
  label: string;
}

export interface StaffDocumentFormField {
  key: string;
  label: string;
  type: StaffDocumentType;
  value: string;
}
