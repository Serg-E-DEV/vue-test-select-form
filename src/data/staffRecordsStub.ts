import { StaffRecord } from '@/interfaces/staff-record.interface';

export const staffRecordsStub: StaffRecord[] = [
  {
    id: 1,
    staffNumber: '1001',
    fullName: 'Иванов Иван Иванович',
    validated: true,
    staffDocuments: [
      {
        id: 1,
        type: 'passport',
        fields: {
          series: '1234',
          number: '567890',
          issuedBy: 'ОВД Москва',
          issueDate: '2015-05-12',
          birthPlace: 'Москва',
        },
        validated: true,
      },
    ],
  },
  { id: 2, staffNumber: '1002', fullName: 'Петрова Мария Дмитриевна', validated: true, staffDocuments: [] },
  {
    id: 3,
    staffNumber: '1003',
    fullName: 'Сидоров Алексей Николаевич',
    validated: true,
    staffDocuments: [
      {
        id: 2,
        type: 'passport',
        fields: {
          series: '1234',
          number: '567890',
          issuedBy: 'ОВД Москва',
          issueDate: '2015-05-12',
          birthPlace: 'Москва',
        },
        validated: true,
      },
      {
        id: 3,
        type: 'snils',
        fields: {
          number: '123-456-789 00',
          issueDate: '2010-01-15',
        },
        validated: true,
      },
    ],
  },
];
