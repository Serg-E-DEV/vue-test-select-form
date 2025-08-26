<script setup lang="ts">
import { SelectOption } from '@/interfaces/select-option.interface';

const model = defineModel<string>({ required: true });

const emit = defineEmits(['change']);

withDefaults(
  defineProps<{
    selectOptions: SelectOption[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);
</script>

<template>
  <select
    v-model="model"
    class="base-input base-select"
    :disabled="disabled"
    @change="(e) => emit('change', e)"
  >
    <option disabled value="">Выберите документ</option>
    <option
      v-for="(selectOption, index) in selectOptions"
      :key="selectOption.selectValue"
      :value="selectOption.selectValue"
      :data-active="selectOption.active ?? null"
    >
      {{ selectOption.selectLabel }}
    </option>
  </select>
</template>

<style scoped></style>
