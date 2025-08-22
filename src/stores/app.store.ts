import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { StaffRecord } from '@/interfaces/staff-record.interface';
import { staffRecordsStub } from '@/data/staffRecordsStub';

const ACCOUNTS_STORAGE_KEY = 'records-storage';

export const useAppStore = defineStore('App', () => {
  const records = ref<StaffRecord[]>([]);
  let nextId = 1;

  function loadRecords() {
    const staffRecordsData = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!staffRecordsData || staffRecordsData === '[]') {
      // Если локалсторидж пустой или данные некорректные — используем заглушки
      records.value = staffRecordsStub;
      nextId = staffRecordsStub.length + 1;
      return;
    }
    try {
      records.value = JSON.parse(staffRecordsData);
      const maxId: number = records.value.reduce(
        (max: number, record: StaffRecord) => Math.max(max, record.id),
        0
      );
      nextId = maxId + 1;
    } catch (e) {
      records.value = [];
      console.error(e);
    }
  }

  function saveRecords() {
    const validatedRecords: StaffRecord[] = records.value.filter((record: StaffRecord) => record.validated);
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(validatedRecords));
  }

  function createRecord() {
    const newRecord: StaffRecord = {
      id: nextId++,
      staffNumber: '',
      fullName: '',
      staffDocuments: [],
      validated: false,
    };

    records.value.push(newRecord);
  }

  function removeRecord(id: number) {
    if (!id) {
      return;
    }
    records.value = records.value.filter((record: StaffRecord) => record.id !== id);
  }

  function updateRecord(updatedRecord: StaffRecord) {
    records.value = records.value.map((record: StaffRecord) =>
      record.id === updatedRecord.id
        ? {
            ...updatedRecord,
          }
        : record
    );
  }

  watch(records, saveRecords, { deep: true });

  loadRecords();

  return {
    records,
    createRecord,
    removeRecord,
    updateRecord,
  };
});
