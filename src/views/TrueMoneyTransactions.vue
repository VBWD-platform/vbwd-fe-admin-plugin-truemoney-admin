<template>
  <div class="truemoney-transactions">
    <header>
      <h2>{{ $t('truemoneyAdmin.transactions.title') }}</h2>
    </header>

    <div v-if="loading">
      {{ $t('truemoneyAdmin.transactions.loading') }}
    </div>
    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>

    <table
      v-else-if="transactions.length > 0"
      class="txtable"
    >
      <thead>
        <tr>
          <th>{{ $t('truemoneyAdmin.transactions.invoiceNo') }}</th>
          <th>{{ $t('truemoneyAdmin.transactions.amount') }}</th>
          <th>{{ $t('truemoneyAdmin.transactions.status') }}</th>
          <th>{{ $t('truemoneyAdmin.transactions.transactionId') }}</th>
          <th>{{ $t('truemoneyAdmin.transactions.createdAt') }}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="tx in transactions"
          :key="tx.id"
        >
          <td>{{ tx.invoice_no }}</td>
          <td>{{ tx.amount }} {{ tx.currency }}</td>
          <td>
            <span :class="['status', `status--${tx.status}`]">{{ tx.status }}</span>
          </td>
          <td>{{ tx.transaction_id || '—' }}</td>
          <td>{{ formatDate(tx.created_at) }}</td>
          <td>
            <button
              v-if="tx.status === 'completed'"
              class="btn btn--refund"
              @click="onRefund(tx)"
            >
              {{ $t('truemoneyAdmin.transactions.refund') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-else
      class="empty"
    >
      {{ $t('truemoneyAdmin.transactions.empty') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, storeToRefs } from 'vue';
import {
  useTrueMoneyStore,
  type TrueMoneyTransaction,
} from '../stores/truemoney';
import { api } from '@/api';

const store = useTrueMoneyStore();
const { transactions, loading, error } = storeToRefs(store);

onMounted(() => {
  store.fetchTransactions(api);
});

async function onRefund(tx: TrueMoneyTransaction) {
  try {
    await store.refund(tx.invoice_no, null, api);
    await store.fetchTransactions(api);
  } catch (e) {
    window.alert(e instanceof Error ? e.message : 'refund failed');
  }
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString();
}
</script>

<style scoped>
.truemoney-transactions { padding: 1.5rem; }
.txtable { width: 100%; border-collapse: collapse; }
.txtable th, .txtable td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vbwd-color-border, #e5e5e5);
  text-align: left;
}
.status--completed { color: var(--vbwd-color-success, #2a7); }
.status--failed,
.status--expired { color: var(--vbwd-color-danger, #b22); }
.status--pending,
.status--processing { color: var(--vbwd-color-muted, #888); }
</style>
