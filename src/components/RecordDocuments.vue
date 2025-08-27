<script setup lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue';
import IconButton from '@/components/base/IconButton.vue';
import DefaultDocumentForm from '@/components/document-forms/DefaultDocumentForm.vue';

import { StaffDocument } from '@/interfaces/staff-document.interface';
import { StaffRecord } from '@/interfaces/staff-record.interface';
import { SelectOption } from '@/interfaces/select-option.interface';
import { DocumentForm } from '@/interfaces/forms.interface';
import { DocumentFormErrors } from '@/interfaces/errors.interface';

import { computed, reactive, ref, watch } from 'vue';
import type { Component } from 'vue';
import { documentsSchema, staffDocumentsSelectOptions } from '@/schemas/documents.schema';
import { useAppStore } from '@/stores/app.store';
import { validateDocumentForm } from '@/modules/validateForms';

const props = defineProps<{ record: StaffRecord }>();

const appStore = useAppStore();

const isEditing = ref<boolean>(false);

const documentComponents: Record<string, Component> = {
  seamanPassport: DefaultDocumentForm,
};

const selectedDocumentType = ref<string>('');

const selectedDocument = computed<StaffDocument | undefined>(() =>
  props.record.staffDocuments.find((document) => document.type === selectedDocumentType.value)
);

const selectOptions = computed<SelectOption[]>(() =>
  staffDocumentsSelectOptions.map((option) => {
    const isAdded = props.record.staffDocuments.some((document) => document.type === option.value);

    return {
      selectValue: option.value,
      selectLabel: isAdded ? `${option.label}` : `${option.label} - добавить`,
      active: isAdded,
    };
  })
);

const isSelectedDocumentAdded = computed<boolean>(() =>
  props.record.staffDocuments.some((document) => document.type === selectedDocumentType.value)
);

const documentForm = ref<DocumentForm>([]);
const documentFormErrors = reactive<DocumentFormErrors>({});

function removeDocument() {
  appStore.removeDocument(props.record.id, selectedDocumentType.value);
}

function validateDocument() {
  validateDocumentForm(documentForm.value, documentFormErrors);
}

function updateDocumentIfValid() {
  if (!validateDocumentForm(documentForm.value, documentFormErrors)) {
    return;
  }

  if (!selectedDocument.value) {
    return;
  }

  appStore.updateDocument(props.record.id, {
    ...selectedDocument.value,
    fields: Object.fromEntries(documentForm.value.map((field) => [field.key, field.value])),
    validated: true,
  });

  isEditing.value = false;
}

watch(
  selectedDocument,
  (newValue) => {
    if (newValue) {
      documentForm.value = Object.entries(newValue.fields).map(([key, value]) => ({
        key,
        label: documentsSchema[newValue.type].fields[key].label,
        type: documentsSchema[newValue.type].fields[key].type,
        value,
      }));
    } else {
      documentForm.value = [];
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="record-documents">
    <div class="record-documents__select-panel">
      <BaseSelect :select-options="selectOptions" v-model="selectedDocumentType" />
      <div class="record-documents__select-controls">
        <IconButton
          icon="add"
          v-if="selectedDocumentType && !isSelectedDocumentAdded"
          @click="
            appStore.addDocument(record.id, selectedDocumentType);
            isEditing = true;
          "
        />
        <IconButton icon="edit" v-if="isSelectedDocumentAdded && !isEditing" @click="isEditing = true" />
        <IconButton icon="save" v-if="isSelectedDocumentAdded && isEditing" @click="updateDocumentIfValid" />
        <IconButton icon="trash" v-if="isSelectedDocumentAdded" @click="removeDocument()" />
      </div>
    </div>
    <div class="record-documents__content">
      <component
        v-if="selectedDocument"
        :is="documentComponents[selectedDocument] || DefaultDocumentForm"
        v-model:fields="documentForm"
        :record="selectedDocument"
        :errors="documentFormErrors"
        :isEditing
        @update-document="updateDocumentIfValid"
        @validate-document="validateDocument"
        @clear-validation="(fieldKey: string) => (documentFormErrors[fieldKey] = false)"
      />
    </div>
  </div>
</template>

<style scoped></style>
