export interface StaffDocument {
  id: number;
  type: 'passport' | 'birthCertificate' | 'seamanPassport';
  fields: Record<string, string>;
}
