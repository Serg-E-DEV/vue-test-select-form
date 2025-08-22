<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  sprite?: string;
  icon?: string;
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  sprite: 'main',
  width: 24,
  height: 24,
});

const rootPath = import.meta.env.BASE_URL;

const href = computed(() => `${rootPath}sprites/${props.sprite}.svg#icon-${props.icon}`);
</script>

<template>
  <svg class="sprite-icon" aria-hidden="true" focusable="false" :width="props.width" :height="props.height">
    <use :href="href"></use>
  </svg>
</template>

<style scoped></style>
