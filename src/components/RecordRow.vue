<script setup lang="ts">
import IconButton from '@/components/base/IconButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';

import { StaffRecord } from '@/interfaces/staff-record.interface';
import { RecordForm } from '@/interfaces/record-form.interface';
import { FormErrors } from '@/interfaces/form-errors.interface';

import { reactive, ref } from 'vue';
import gsap from 'gsap';
import { useAppStore } from '@/stores/app.store';
import { validateRecordForm } from '@/modules/validateForms';
import { normalizeInput } from '@/modules/normalize';

const props = defineProps<{
  record: StaffRecord;
}>();

const appStore = useAppStore();

const isEditing = ref<Boolean>(!props.record.validated);

const recordRow = ref<HTMLElement>();

const recordForm = reactive<RecordForm>({
  staffNumber: props.record.staffNumber,
  fullName: props.record.fullName,
  validated: props.record.validated,
});

const formErrors = reactive<FormErrors>({
  staffNumber: false,
  fullName: false,
  validated: false,
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

function updateIfValid() {
  recordForm.staffNumber = normalizeInput(recordForm.staffNumber);
  recordForm.fullName = normalizeInput(recordForm.fullName);

  if (!validateRecordForm(recordForm, formErrors)) {
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
      :error="formErrors.staffNumber"
      :disabled="!isEditing"
      @keydown.enter="updateIfValid"
    />
    <BaseInput
      v-model="recordForm.fullName"
      class="record-row__input"
      placeholder="Введите ФИО сотрудника"
      name="login"
      maxlength="100"
      :error="formErrors.fullName"
      :disabled="!isEditing"
      @keydown.enter="updateIfValid"
    />
    <div class="record-row__controls">
      <IconButton icon="edit" v-if="!isEditing" @click="isEditing = true" />
      <IconButton icon="save" v-if="isEditing" @click="updateIfValid" />
      <IconButton icon="trash" @click="removeRecord" />
    </div>
  </div>
</template>

<style scoped></style>
