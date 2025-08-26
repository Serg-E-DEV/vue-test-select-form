import {
  StaffDocumentSchema,
  staffDocumentsSelectOption,
  StaffDocumentType,
} from '@/interfaces/staff-document.interface';

export const DocumentsSchema: Record<string, StaffDocumentSchema> = {
  passport: {
    label: 'Паспорт',
    fields: {
      series: { type: 'string', label: 'Серия' },
      number: { type: 'string', label: 'Номер' },
      issuedBy: { type: 'string', label: 'Кем выдан' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
      birthPlace: { type: 'string', label: 'Место рождения' },
    },
  },
  snils: {
    label: 'СНИЛС',
    fields: {
      number: { type: 'string', label: 'Номер' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
    },
  },
  inn: {
    label: 'ИНН',
    fields: {
      number: { type: 'string', label: 'Номер' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
    },
  },
  seamanPassport: {
    label: 'Паспорт моряка',
    fields: {
      series: { type: 'string', label: 'Серия' },
      number: { type: 'string', label: 'Номер' },
      issuedBy: { type: 'string', label: 'Кем выдан' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
      expiryDate: { type: 'date', label: 'Срок действия' },
      birthPlace: { type: 'string', label: 'Место рождения' },
    },
  },
};

export const staffDocumentsSelectOptions: staffDocumentsSelectOption[] = Object.entries(DocumentsSchema).map(
  ([key, { label }]): staffDocumentsSelectOption => ({
    value: key as StaffDocumentType,
    label: label,
  })
);
