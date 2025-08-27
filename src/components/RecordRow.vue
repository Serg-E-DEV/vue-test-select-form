<script setup lang="ts">
import IconButton from '@/components/base/IconButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import ResetButton from '@/components/base/ResetButton.vue';

import { StaffRecord } from '@/interfaces/staff-record.interface';
import { RecordForm } from '@/interfaces/forms.interface';

import { RecordFormErrors } from '@/interfaces/errors.interface';
import { reactive, ref } from 'vue';
import gsap from 'gsap';
import { useAppStore } from '@/stores/app.store';
import { validateRecordForm } from '@/modules/validateForms';

const props = defineProps<{
  record: StaffRecord;
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

function removeRecord() {
  if (!recordRow.value) {
    return;
  }

  gsap.to(recordRow.value, {
    duration: 0.6,
    x: '-100%',
    opacity: 0,
    ease: 'power1.inOut',
    onComplete: () => {
      appStore.removeRecord(props.record.id);
    },
  });
}

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
      :class="['record-row__btn-docs', { 'record-row__btn-docs_empty': !props.record.staffDocuments.length }]"
    >
      Документы: {{ record.staffDocuments.length }}
    </ResetButton>
    <div class="record-row__controls">
      <IconButton icon="edit" v-if="!isEditing" @click="isEditing = true" />
      <IconButton icon="save" v-if="isEditing" @click="updateRecordIfValid" />
      <IconButton icon="trash" @click="removeRecord" />
    </div>
  </div>
</template>

<style scoped></style>
