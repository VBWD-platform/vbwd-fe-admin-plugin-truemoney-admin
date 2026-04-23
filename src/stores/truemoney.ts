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

export const useTrueMoneyStore = defineStore('truemoney-admin', () => {
  const transactions = ref<TrueMoneyTransaction[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTransactions(api: { get: typeof fetch }) {
    loading.value = true;
    error.value = null;
    try {
      const resp = await api.get('/api/v1/plugins/truemoney/transactions');
      const body = await resp.json();
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
    api: {
      post: (url: string, body: unknown) => Promise<Response>;
    },
  ) {
    const resp = await api.post(
      `/api/v1/plugins/truemoney/transactions/${invoiceNo}/refund`,
      amount !== null ? { amount } : {},
    );
    if (!resp.ok) {
      throw new Error(`refund failed: ${resp.status}`);
    }
    return resp.json();
  }

  return { transactions, loading, error, fetchTransactions, refund };
});
