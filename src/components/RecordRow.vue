<script setup lang="ts">
import IconButton from '@/components/base/IconButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import ResetButton from '@/components/base/ResetButton.vue';

import { StaffRecord } from '@/interfaces/staff-record.interface';
import { RecordForm } from '@/interfaces/forms.interface';

import { RecordFormErrors } from '@/interfaces/errors.interface';
import { computed, reactive, ref } from 'vue';
import { useAppStore } from '@/stores/app.store';
import { validateRecordForm } from '@/modules/validateForms';
import SpriteIcon from '@/components/base/SpriteIcon.vue';

const props = defineProps<{
  record: StaffRecord;
  isExpanded: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-documents-panel', recordId: number);
  (e: 'remove-record', id: number);
}>();

const appStore = useAppStore();

const isEditing = ref<Boolean>(!props.record.validated);

const recordRow = ref<HTMLElement>();

const recordForm = reactive<RecordForm>({
  staffNumber: props.record.staffNumber,
  fullName: props.record.fullName,
});

const recordFormErrors = reactive<RecordFormErrors>({
  staffNumber: false,
  fullName: false,
});

const validDocumentsCount = computed(() => {
  return props.record.staffDocuments.filter((document) => document.validated).length;
});

function validateRecord() {
  validateRecordForm(recordForm, recordFormErrors);
}

function updateRecordIfValid() {
  if (!validateRecordForm(recordForm, recordFormErrors)) {
    return;
  }

  appStore.updateRecord({
    id: props.record.id,
    staffDocuments: props.record.staffDocuments,
    staffNumber: recordForm.staffNumber,
    fullName: recordForm.fullName,
    validated: true,
  });

  isEditing.value = false;
}

function toggleDocumentsPanel() {
  emit('toggle-documents-panel', props.record.id);
}
</script>

<template>
  <div
    :class="[
      'record-row',
      { 'record-row_valid': props.record.validated },
      { 'record-row_invalid': !props.record.validated },
    ]"
    ref="recordRow"
  >
    <div class="record-row__id">{{ record.id }}</div>
    <BaseInput
      v-model="recordForm.staffNumber"
      class="record-row__input"
      placeholder="Табельный номер"
      name="staff-number"
      maxlength="100"
      :error="recordFormErrors.staffNumber"
      :disabled="!isEditing"
      @keydown.enter="updateRecordIfValid"
      @input="recordFormErrors.staffNumber = false"
      @blur="validateRecord"
    />
    <BaseInput
      v-model="recordForm.fullName"
      class="record-row__input"
      placeholder="ФИО сотрудника"
      name="login"
      maxlength="100"
      :error="recordFormErrors.fullName"
      :disabled="!isEditing"
      @keydown.enter="updateRecordIfValid"
      @input="recordFormErrors.fullName = false"
      @blur="validateRecord"
    />
    <ResetButton
      :class="['record-row__btn-docs', { 'record-row__btn-docs_empty': !validDocumentsCount }]"
      v-if="!isEditing"
      :aria-controls="`documents-panel-${record.id}`"
      :aria-expanded="isExpanded"
      @click="toggleDocumentsPanel"
    >
      <SpriteIcon icon="caret-right" :width="12" :height="12" class="record-row__btn-docs-icon" />
      {{
        validDocumentsCount > 0 ? `Документы: ${validDocumentsCount}` : `Документы: ${validDocumentsCount}`
      }}
    </ResetButton>
    <div class="record-row__controls">
      <IconButton icon="edit" v-if="!isEditing" @click="isEditing = true" />
      <IconButton icon="save" v-if="isEditing" @click="updateRecordIfValid" />
      <IconButton icon="trash" @click="emit('remove-record', record.id)" />
    </div>
  </div>
</template>

<style scoped></style>
