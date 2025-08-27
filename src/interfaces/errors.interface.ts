export interface RecordFormErrors {
  staffNumber: boolean;
  fullName: boolean;
}

export interface DocumentFormErrors {
  [fieldName: string]: boolean;
}
