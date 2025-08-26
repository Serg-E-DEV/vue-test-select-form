<script setup lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue';
import IconButton from '@/components/base/IconButton.vue';
import DefaultDocumentForm from '@/components/document-forms/DefaultDocumentForm.vue';
import { computed, ref, watch } from 'vue';
import type { Component } from 'vue';
import { DocumentsSchema, staffDocumentsSelectOptions } from '@/schemas/documents.schema';
import { StaffDocument, staffDocumentsSelectOption } from '@/interfaces/staff-document.interface';
import { StaffRecord } from '@/interfaces/staff-record.interface';
import { SelectOption } from '@/interfaces/select-option.interface';

const props = defineProps<{ record: StaffRecord }>();

const isEditing = ref<boolean>(false);

const documentComponents: Record<string, Component> = {
  seamanPassport: DefaultDocumentForm,
};

const selectedDocumentType = ref<string>('');

const selectedDocument = computed<StaffDocument | undefined>(() =>
  props.record.staffDocuments.find((document) => document.type === selectedDocumentType.value)
);

const selectedOptions = computed<SelectOption[]>(() =>
  staffDocumentsSelectOptions.map((option: staffDocumentsSelectOption) => {
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

const documentFields = computed(() => {
  if (!selectedDocumentType.value) {
    return;
  }

  const schema = DocumentsSchema[selectedDocumentType.value];
  if (!schema) {
    return;
  }

  return Object.entries(schema.fields).map(([key, { label, type }]) => ({
    key,
    label,
    type,
    value: selectedDocument.value?.fields[key] ?? '',
  }));
});

watch(selectedDocumentType, () => {
  isEditing.value = false;
});
</script>

<template>
  <div class="record-documents">
    <div class="record-documents__select-panel">
      <BaseSelect :select-options="selectedOptions" v-model="selectedDocumentType" />
      <div class="record-documents__select-controls">
        <IconButton icon="add" v-if="!isSelectedDocumentAdded" @click="" />
        <IconButton icon="edit" v-if="isSelectedDocumentAdded && !isEditing" @click="isEditing = true" />
        <IconButton icon="save" v-if="isEditing" @click="" />
        <IconButton icon="trash" v-if="isSelectedDocumentAdded" @click="" />
      </div>
    </div>
    <div class="record-documents__content">
      <component
        v-if="selectedDocument"
        :is="documentComponents[selectedDocument] || DefaultDocumentForm"
        :fields="documentFields"
        :record="selectedDocument"
        :isEditing
      />
    </div>
  </div>
</template>

<style scoped></style>
