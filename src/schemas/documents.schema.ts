import {
  StaffDocumentSchema,
  StaffDocumentsSelectOption,
  StaffDocumentType,
} from '@/interfaces/staff-document.interface';

export const documentsSchema: Record<string, StaffDocumentSchema> = {
  driverLicense: {
    label: 'Водительское удостоверение',
    fields: {
      series: { type: 'string', label: 'Серия' },
      number: { type: 'string', label: 'Номер' },
      category: { type: 'string', label: 'Категория' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
      expiryDate: { type: 'date', label: 'Срок действия' },
    },
  },
  employmentContract: {
    label: 'Трудовой договор',
    fields: {
      number: { type: 'string', label: 'Номер договора' },
      startDate: { type: 'date', label: 'Дата начала' },
      endDate: { type: 'date', label: 'Дата окончания' },
      employer: { type: 'string', label: 'Работодатель' },
    },
  },
  inn: {
    label: 'ИНН',
    fields: {
      number: { type: 'string', label: 'Номер' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
    },
  },
  medicalBook: {
    label: 'Медицинская книжка',
    fields: {
      number: { type: 'string', label: 'Номер' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
      expiryDate: { type: 'date', label: 'Срок действия' },
      medicalInstitution: { type: 'string', label: 'Медучреждение' },
    },
  },
  militaryId: {
    label: 'Военный билет',
    fields: {
      series: { type: 'string', label: 'Серия' },
      number: { type: 'string', label: 'Номер' },
      issuedBy: { type: 'string', label: 'Кем выдан' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
      militaryRank: { type: 'string', label: 'Воинское звание' },
    },
  },
  omsPolicy: {
    label: 'Полис ОМС',
    fields: {
      number: { type: 'string', label: 'Номер' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
      expiryDate: { type: 'date', label: 'Срок действия' },
      insuranceCompany: { type: 'string', label: 'Страховая компания' },
    },
  },
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
  snils: {
    label: 'СНИЛС',
    fields: {
      number: { type: 'string', label: 'Номер' },
      issueDate: { type: 'date', label: 'Дата выдачи' },
    },
  },
};

export const staffDocumentsSelectOptions: StaffDocumentsSelectOption[] = Object.entries(documentsSchema)
  .map(
    ([key, { label }]): StaffDocumentsSelectOption => ({
      value: key as StaffDocumentType,
      label,
    })
  )
  .sort((a, b) => a.label.localeCompare(b.label, 'ru'));
