<script setup lang="ts">
const model = defineModel<string | number | Date>({ required: true, default: '' });
interface Props {
  type?: 'text' | 'number' | 'date';
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: 'Введите значение',
  disabled: false,
  error: false,
});
</script>

<template>
  <input
    v-model="model"
    :type="props.type"
    :placeholder="props.placeholder"
    :disabled="disabled"
    :class="['base-input', { 'base-input_invalid': props.error }]"
  />
</template>

<style scoped></style>
