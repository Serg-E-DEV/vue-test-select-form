import { RecordForm } from '@/interfaces/record-form.interface';
import { FormErrors } from '@/interfaces/form-errors.interface';

export function validateRecordForm(form: RecordForm, errors: FormErrors): boolean {
  errors.staffNumber = form.staffNumber === '';
  errors.fullName = form.fullName === '';

  return !Object.values(errors).some(Boolean);
}
