<script setup lang="ts">
import SpriteIcon from '@/components/base/SpriteIcon.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import RecordRow from '@/components/RecordRow.vue';
import { useAppStore } from '@/stores/app.store';

const appStore = useAppStore();
</script>

<template>
  <div class="page main-page">
    <main class="main-page__main section section_horizontal-indents">
      <section class="staff-records">
        <div class="staff-records__header">
          <h1 class="staff-records__title">Учетные карточки сотрудников</h1>
          <BaseButton theme="ghost" shape="square" @click="appStore.createRecord()">
            <SpriteIcon icon="add" />
          </BaseButton>
        </div>

        <div class="staff-records__info">
          <span class="base-hint base-hint_theme_primary">
            <SpriteIcon icon="question" />
            К учётной карточке сотрудника можно добавить только один документ каждого вида.
          </span>
        </div>

        <div class="staff-records__rows">
          <div class="record-row record-row_header">
            <span class="record-row__title">ID</span>
            <span class="record-row__title">Табельный номер</span>
            <span class="record-row__title">ФИО</span>
          </div>
          <RecordRow
            v-for="record in appStore.records"
            :key="record.id"
            :record="record"
            class="staff-records__row"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
