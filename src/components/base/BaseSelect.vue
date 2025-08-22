<script setup lang="ts">
const model = defineModel<string>({ required: true });

const emit = defineEmits(['change']);

type SelectOption = string | { selectValue: string; selectLabel: string };

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
    <option
      v-for="(selectOption, i) in selectOptions"
      :key="i"
      :value="typeof selectOption === 'string' ? selectOption : selectOption.selectValue"
    >
      {{ typeof selectOption === 'string' ? selectOption : selectOption.selectLabel }}
    </option>
  </select>
</template>

<style scoped></style>
