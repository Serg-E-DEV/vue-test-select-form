<script setup lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue';
import IconButton from '@/components/base/IconButton.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import DefaultDocumentForm from '@/components/document-forms/DefaultDocumentForm.vue';
import PassportDocumentForm from '@/components/document-forms/PassportDocumentForm.vue';

import { StaffDocument } from '@/interfaces/staff-document.interface';
import { StaffRecord } from '@/interfaces/staff-record.interface';
import { SelectOption } from '@/interfaces/select-option.interface';

import { DocumentForm } from '@/interfaces/forms.interface';
import { DocumentFormErrors } from '@/interfaces/errors.interface';
import { computed, nextTick, reactive, ref, watch } from 'vue';
import type { Component } from 'vue';
import { documentsSchema, staffDocumentsSelectOptions } from '@/schemas/documents.schema';
import { useAppStore } from '@/stores/app.store';
import { clearDocumentFormErrors, validateDocumentForm } from '@/modules/validateForms';
import gsap from 'gsap';

interface formComponent {
  fieldHtmlElements: HTMLElement[];
}

const props = defineProps<{ record: StaffRecord }>();

const emit = defineEmits<{
  (e: 'toggle-documents-panel', recordId: number);
}>();

const appStore = useAppStore();

const isEditing = ref<boolean>(false);

const rootHtmlElement = ref<HTMLElement>();
const formComponent = ref<formComponent>();

const documentComponents: Record<string, Component> = {
  passport: PassportDocumentForm,
  seamanPassport: PassportDocumentForm,
};

const selectedDocumentType = ref<string>('');

const selectedDocument = computed<StaffDocument | undefined>(() =>
  props.record.staffDocuments.find((document) => document.type === selectedDocumentType.value)
);

const selectOptions = computed<SelectOption[]>(() =>
  staffDocumentsSelectOptions.map((option) => {
    const isValid = props.record.staffDocuments.some(
      (document) => document.type === option.value && document.validated
    );

    return {
      selectValue: option.value,
      selectLabel: isValid ? `${option.label} ✓` : `${option.label}`,
      active: isValid,
    };
  })
);

const isSelectedDocumentAdded = computed<boolean>(() =>
  props.record.staffDocuments.some((document) => document.type === selectedDocumentType.value)
);

const documentForm = ref<DocumentForm>([]);
const documentFormErrors = reactive<DocumentFormErrors>({});

function removeDocument() {
  clearDocumentFormErrors(documentFormErrors);
  appStore.removeDocument(props.record.id, selectedDocumentType.value);
  isEditing.value = false;
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

watch(isEditing, async (newVal, oldVal) => {
  if (newVal && !oldVal && isSelectedDocumentAdded.value && !selectedDocument.value?.validated) {
    await nextTick();
    const fields = formComponent.value?.fieldHtmlElements;
    if (fields && fields.length > 0) {
      gsap.from(fields, {
        opacity: 0,
        y: -12,
        duration: 0.2,
        stagger: 0.1,
        ease: 'power1.out',
      });
    }
  }
});

defineExpose({ rootHtmlElement });
</script>

<template>
  <div
    class="record-documents scrollbar-style"
    :class="{ 'record-documents_active': record.staffDocuments.length }"
    ref="rootHtmlElement"
    role="region"
    :id="`documents-panel-${record.id}`"
    :aria-labelledby="`documents-panel-toggler-${record.id}`"
  >
    <div class="record-documents__select-panel">
      <BaseSelect
        class="record-documents__select"
        :select-options="selectOptions"
        v-model="selectedDocumentType"
        :disabled="isEditing === true"
      />
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
        :is="documentComponents[selectedDocument?.type] || DefaultDocumentForm"
        v-model:fields="documentForm"
        :errors="documentFormErrors"
        :isEditing
        @update-document="updateDocumentIfValid"
        @validate-document="validateDocument"
        @clear-validation="(fieldKey: string) => (documentFormErrors[fieldKey] = false)"
        ref="formComponent"
      />
    </div>
    <div class="record-documents__buttons">
      <BaseButton theme="primary" v-if="isSelectedDocumentAdded && isEditing" @click="updateDocumentIfValid">
        Сохранить
      </BaseButton>
      <BaseButton theme="ghost" v-if="!isEditing" @click="emit('toggle-documents-panel', record.id)"
        >Закрыть</BaseButton
      >
      <BaseButton
        theme="ghost"
        v-if="isSelectedDocumentAdded && isEditing"
        @click="emit('toggle-documents-panel', record.id)"
      >
        Отменить
      </BaseButton>
    </div>
  </div>
</template>

<style scoped></style>
