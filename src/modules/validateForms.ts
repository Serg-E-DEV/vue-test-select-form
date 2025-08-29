import { DocumentForm, RecordForm } from '@/interfaces/forms.interface';
import { DocumentFormErrors, RecordFormErrors } from '@/interfaces/errors.interface';
import { normalizeInput } from '@/modules/normalize';

export function validateRecordForm(form: RecordForm, errors: RecordFormErrors): boolean {
  form.staffNumber = normalizeInput(form.staffNumber);
  form.fullName = normalizeInput(form.fullName);

  errors.staffNumber = form.staffNumber === '';
  errors.fullName = form.fullName === '';

  return !Object.values(errors).some(Boolean);
}

export function validateDocumentForm(form: DocumentForm, errors: DocumentFormErrors): boolean {
  form.forEach((field) => {
    field.value = normalizeInput(field.value);
  });

  form.forEach((field) => {
    errors[field.key] = !field.value;
  });

  return !Object.values(errors).some(Boolean);
}

export function clearDocumentFormErrors(errors: DocumentFormErrors) {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });
}
