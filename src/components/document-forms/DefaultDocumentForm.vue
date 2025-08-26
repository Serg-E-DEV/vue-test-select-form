<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue';

defineProps<{
  isEditing: boolean;
  fields: {
    key: string;
    label: string;
    type: 'string' | 'date';
    value: string | Date;
  }[];
}>();
</script>

<template>
  <div class="document-form document-form_theme_default">
    <div v-for="field in fields" :key="field.key" class="document-form__field">
      <label class="document-form__label">{{ field.label }}</label>
      <BaseInput
        class="document-form__input"
        :type="field.type === 'date' ? 'date' : 'text'"
        v-model="field.value"
        :disabled="!isEditing"
      />
    </div>
  </div>
</template>

<style scoped></style>
