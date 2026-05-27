import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface TrueMoneyTransaction {
  id: string;
  invoice_no: string;
  merchant_id: string;
  transaction_id: string | null;
  amount: string;
  currency: string;
  qr_payload: string | null;
  deep_link: string | null;
  status: string;
  last_provider_status: string | null;
  expires_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

/** Minimal surface of the host's ``@/api`` ApiClient — promise-returning,
    already-parsed body. Each plugin types its store against this so the
    view can pass ``api`` from the host without TS complaints. */
interface ApiClientLike {
  get<T = unknown>(url: string, config?: unknown): Promise<T>;
  post<T = unknown>(url: string, body?: unknown, config?: unknown): Promise<T>;
}

export const useTrueMoneyStore = defineStore('truemoney-admin', () => {
  const transactions = ref<TrueMoneyTransaction[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTransactions(api: ApiClientLike) {
    loading.value = true;
    error.value = null;
    try {
      const body = await api.get<{ transactions: TrueMoneyTransaction[] }>('/api/v1/plugins/truemoney/transactions');
      transactions.value = body.transactions || [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load';
    } finally {
      loading.value = false;
    }
  }

  async function refund(
    invoiceNo: string,
    amount: number | null,
    api: ApiClientLike,
  ) {
    return api.post(
      `/api/v1/plugins/truemoney/transactions/${invoiceNo}/refund`,
      amount !== null ? { amount } : {},
    );
  }

  return { transactions, loading, error, fetchTransactions, refund };
});
