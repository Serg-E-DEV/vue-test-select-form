import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { StaffRecord } from '@/interfaces/staff-record.interface';
import { staffRecordsStub } from '@/data/staffRecordsStub';
import { documentsSchema } from '@/schemas/documents.schema';
import { StaffDocument } from '@/interfaces/staff-document.interface';

const ACCOUNTS_STORAGE_KEY = 'records-storage';

export const useAppStore = defineStore('App', () => {
  const records = ref<StaffRecord[]>([]);
  let nextRecordId = 1;

  function loadRecords() {
    const staffRecordsData = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!staffRecordsData || staffRecordsData === '[]') {
      // Если localstorage пуст или все записи удалены — используем заглушки
      records.value = staffRecordsStub;
      nextRecordId = staffRecordsStub.length + 1;
      return;
    }
    try {
      records.value = JSON.parse(staffRecordsData);
      const maxRecordId: number = records.value.reduce(
        (max: number, record: StaffRecord) => Math.max(max, record.id),
        0
      );
      nextRecordId = maxRecordId + 1;
    } catch (e) {
      records.value = [];
      console.error(e);
    }
  }

  function saveRecords() {
    const validatedRecords: StaffRecord[] = records.value
      .filter((record: StaffRecord) => record.validated)
      .map((record: StaffRecord) => ({
        ...record,
        staffDocuments: record.staffDocuments.filter((document) => document.validated),
      }));

    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(validatedRecords));
  }

  function createRecord() {
    const newRecord: StaffRecord = {
      id: nextRecordId++,
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

  function removeDocument(recordId: number, documentType: string) {
    const record: StaffRecord | undefined = records.value.find(
      (record: StaffRecord) => record.id === recordId
    );
    if (!record) return;

    record.staffDocuments = record.staffDocuments.filter((document) => document.type !== documentType);
  }

  function addDocument(recordId: number, documentType: string) {
    const record: StaffRecord | undefined = records.value.find(
      (record: StaffRecord) => record.id === recordId
    );
    if (!record) return;

    const schema = documentsSchema[documentType];
    if (!schema) return;

    const maxDocumentId = records.value.reduce((max, record: StaffRecord) => {
      return Math.max(max, ...record.staffDocuments.map((document) => document.id));
    }, 0);

    const newDocument: StaffDocument = {
      id: maxDocumentId + 1,
      type: documentType,
      fields: Object.fromEntries(Object.keys(schema.fields).map((key) => [key, ''])),
      validated: false,
    };

    record.staffDocuments.push(newDocument);
  }

  function updateDocument(recordId: number, updatedDocument: StaffDocument) {
    const record: StaffRecord | undefined = records.value.find(
      (record: StaffRecord) => record.id === recordId
    );
    if (!record) {
      return;
    }

    record.staffDocuments = record.staffDocuments.map((document) =>
      document.id === updatedDocument.id ? { ...updatedDocument } : document
    );
  }

  watch(records, saveRecords, { deep: true });

  loadRecords();

  return {
    records,
    createRecord,
    removeRecord,
    updateRecord,
    removeDocument,
    addDocument,
    updateDocument,
  };
});
