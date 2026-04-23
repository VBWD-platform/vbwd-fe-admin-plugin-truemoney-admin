import type { IPlugin, IPlatformSDK } from 'vbwd-view-component';

export const trueMoneyAdminPlugin: IPlugin = {
  name: 'truemoney-admin',
  version: '1.0.0',
  description:
    'TrueMoney admin — transactions list + refund. Config lives in core Settings → Plugins.',

  install(sdk: IPlatformSDK) {
    sdk.addRoute({
      path: 'truemoney/transactions',
      name: 'truemoney-transactions',
      component: () => import('./src/views/TrueMoneyTransactions.vue'),
      meta: { requiredPermission: 'payments.configure' },
    });
  },

  activate() {},
  deactivate() {},
};
