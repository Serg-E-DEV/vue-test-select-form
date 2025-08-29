import { StaffRecord } from '@/interfaces/staff-record.interface';

export const staffRecordsStub: StaffRecord[] = [
  {
    id: 1,
    staffNumber: '19-001',
    fullName: 'Иванов Иван Иванович',
    validated: true,
    staffDocuments: [
      {
        id: 1,
        type: 'passport',
        fields: {
          series: '1234',
          number: '567890',
          fullName: 'Иванов Иван Иванович',
          dateOfBirth: '1990-03-25',
          birthPlace: 'Москва',
          issuedBy: 'ОВД Москва',
          issueDate: '2015-05-12',
        },
        validated: true,
      },
    ],
  },
  {
    id: 2,
    staffNumber: '22-009',
    fullName: 'Петрова Мария Дмитриевна',
    validated: true,
    staffDocuments: [],
  },
  {
    id: 3,
    staffNumber: '22-008',
    fullName: 'Сидоров Алексей Николаевич',
    validated: true,
    staffDocuments: [
      {
        id: 2,
        type: 'passport',
        fields: {
          series: '4321',
          number: '098765',
          fullName: 'Сидоров Алексей Николаевич',
          dateOfBirth: '1988-07-14',
          birthPlace: 'Санкт-Петербург',
          issuedBy: 'ОВД Санкт-Петербург',
          issueDate: '2012-09-01',
        },
        validated: true,
      },
      {
        id: 3,
        type: 'seamanPassport',
        fields: {
          series: 'МР123',
          number: '000987',
          fullName: 'Сидоров Алексей Николаевич',
          dateOfBirth: '1988-07-14',
          birthPlace: 'Санкт-Петербург',
          nationality: 'Россия',
          issuedBy: 'Минтранс РФ',
          issueDate: '2018-06-20',
          expiryDate: '2028-06-20',
        },
        validated: true,
      },
      {
        id: 4,
        type: 'driverLicense',
        fields: {
          series: 'АА',
          number: '123456',
          category: 'B',
          issueDate: '2010-05-12',
          expiryDate: '2030-05-12',
        },
        validated: true,
      },
      {
        id: 5,
        type: 'employmentContract',
        fields: {
          number: 'ТД-001',
          startDate: '2010-06-01',
          endDate: '2030-06-01',
          employer: 'ООО Ромашка',
        },
        validated: true,
      },
      {
        id: 6,
        type: 'inn',
        fields: {
          number: '770123456789',
          issueDate: '2008-03-15',
        },
        validated: true,
      },
      {
        id: 7,
        type: 'medicalBook',
        fields: {
          number: 'МБ-123456',
          issueDate: '2015-01-10',
          expiryDate: '2025-01-10',
          medicalInstitution: 'ГБУЗ «Поликлиника №1»',
        },
        validated: true,
      },
      {
        id: 8,
        type: 'militaryId',
        fields: {
          series: 'ВБ',
          number: '654321',
          issuedBy: 'Военкомат СПб',
          issueDate: '2006-07-10',
          militaryRank: 'Сержант',
        },
        validated: true,
      },
      {
        id: 9,
        type: 'omsPolicy',
        fields: {
          number: 'ОМС-987654',
          issueDate: '2010-01-01',
          expiryDate: '2030-01-01',
          insuranceCompany: 'Росгосстрах',
        },
        validated: true,
      },
      {
        id: 10,
        type: 'snils',
        fields: {
          number: '123-456-789 00',
          issueDate: '2000-05-05',
        },
        validated: true,
      },
    ],
  },
  {
    id: 4,
    staffNumber: '23-004',
    fullName: 'Дмитриев Вячеслав Олегович',
    validated: true,
    staffDocuments: [],
  },
];
