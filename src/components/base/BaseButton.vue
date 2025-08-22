<script setup lang="ts">
interface Props {
  type?: string;
  theme?: string;
  shape?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  theme: '',
  shape: '',
});
const themeModificator = props.theme && `base-button_theme_${props.theme}`;
const shapeModificator = props.shape && `base-button_shape_${props.shape}`;
</script>

<template>
  <button :type="props.type" :class="['base-button', themeModificator, shapeModificator]">
    <span class="base-button__inner">
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
