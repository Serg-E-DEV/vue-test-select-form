<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue';
import { StaffDocumentFormField } from '@/interfaces/staff-document.interface';
import { DocumentFormErrors } from '@/interfaces/errors.interface';

defineProps<{
  isEditing: boolean;
  fields: StaffDocumentFormField[];
  errors: DocumentFormErrors;
}>();

const emit = defineEmits<{
  (e: 'update:fields', updatedFields: StaffDocumentFormField[]): void;
  (e: 'update-document'): void;
  (e: 'validate-document'): void;
  (e: 'clear-validation', fieldKey: string): void;
}>();
</script>

<template>
  <div class="document-form document-form_theme_default">
    <div v-for="(field, index) in fields" :key="field.key" class="document-form__field">
      <label class="document-form__label">{{ field.label }}</label>
      <BaseInput
        class="document-form__input"
        :type="field.type === 'date' ? 'date' : 'text'"
        v-model="fields[index].value"
        :error="errors[field.key]"
        :disabled="!isEditing"
        @input="() => emit('clear-validation', field.key)"
        @blur="emit('validate-document')"
        @keydown.enter="emit('update-document')"
      />
    </div>
  </div>
</template>

<style scoped></style>
