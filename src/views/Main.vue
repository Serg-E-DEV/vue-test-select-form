<script setup lang="ts">
import SpriteIcon from '@/components/base/SpriteIcon.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import RecordRow from '@/components/RecordRow.vue';
import { useAppStore } from '@/stores/app.store';
import RecordDocuments from '@/components/RecordDocuments.vue';
import { nextTick, ref } from 'vue';
import gsap from 'gsap';

const appStore = useAppStore();

const openedRecordId = ref<number | null>();

const documentPanels: Record<number, HTMLElement | null> = {};
const rowContainers: Record<number, HTMLElement | null> = {};

async function toggleDocuments(recordId: number) {
  const isOpened = openedRecordId.value === recordId;
  let panel: HTMLElement | null;

  const tl = gsap.timeline();

  if (isOpened) {
    // close
    panel = documentPanels[recordId];

    if (!panel) {
      return;
    }

    tl.set(panel, { overflow: 'hidden' });
    tl.to(panel, { height: 0, opacity: 0, duration: 0.6, ease: 'power1.inOut' });
    tl.to(
      panel,
      {
        marginTop: 0,
        borderWidth: 0,
        duration: 0.1,
        ease: 'power1.inOut',
      },
      0.5
    );
    tl.eventCallback('onComplete', () => {
      openedRecordId.value = null;
    });
  } else {
    // open
    openedRecordId.value = recordId;

    appStore.clearInvalidDocuments();

    await nextTick();

    const panel = documentPanels[recordId];

    if (!panel) {
      return;
    }

    tl.set(panel, { overflow: 'hidden' });
    tl.to(panel, {
      marginTop: 8,
      height: 'auto',
      opacity: 1,
      duration: 0.6,
      ease: 'power1.inOut',
    });
    tl.to(
      panel,
      {
        opacity: 1,
        duration: 0.1,
        ease: 'power1.inOut',
      },
      0.5
    );
  }
}

function removeRecord(id: number) {
  const row = rowContainers[id];
  if (!row) {
    return;
  }

  const tl = gsap.timeline();

  tl.to(row, {
    x: '-100%',
    duration: 0.6,
    opacity: 0,
    ease: 'power1.inOut',
  });

  tl.to(
    row,
    {
      duration: 0.2,
      height: 0,
      marginBottom: 0,
      ease: 'power1.inOut',
    },
    0.4
  );

  tl.eventCallback('onComplete', () => {
    appStore.removeRecord(id);
    rowContainers[id] = null;
  });
}
</script>

<template>
  <div class="page main-page">
    <main class="main-page__main section section_horizontal-indents">
      <section class="staff-records">
        <div class="staff-records__header">
          <h1 class="staff-records__title">Учетные карточки сотрудников</h1>
          <BaseButton
            class="staff-records__btn-add"
            theme="ghost"
            shape="square"
            @click="appStore.createRecord()"
          >
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
          <div
            class="staff-records__row-container"
            v-for="(record, index) in appStore.records"
            :key="record.id"
            :ref="(el) => (rowContainers[record.id] = el)"
          >
            <RecordRow
              :record="record"
              :is-expanded="openedRecordId === record.id"
              @toggle-documents-panel="toggleDocuments"
              @remove-record="removeRecord"
            />
            <RecordDocuments
              :ref="(el) => (documentPanels[record.id] = el ? el.rootHtmlElement : null)"
              :record="record"
              v-if="openedRecordId === record.id"
              class="staff-records__row-documents"
              @toggle-documents-panel="toggleDocuments"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
