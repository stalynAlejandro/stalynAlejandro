import { mockFile } from '../../../../mockFile';

const customer = {
  customerId: '001',
  email: 'mock email 1',
  name: 'Coca Cola S.L.',
  office: '1234',
  personNumber: 'BUC-1234567',
  segment: 'SME',
  taxId: 'B1234567',
};

const account = {
  currency: 'EUR',
  iban: 'PT50 0002 0123 5678 9015 1',
  id: '001001',
};

export const formData = {
  customer,
  documentation: {
    files: [mockFile()],
    priority: 'urgent',
  },
  request: {
    amount: '22.00',
    clientAccount: account,
    comments: 'holacomentario',
    commissionAccount: account,
    currency: {
      currency: 'EUR',
      id: 'EUR',
    },
    expirationDate: '',
    expirationDays: '20',
    expirationType: 'days',
    importCollection: {
      amount: '22.0',
      approvalDate: '2023-02-08T11:47:25.530+01:00',
      code: 'MTR-10',
      contractReference: 'CLI-1234567890',
      creationDate: '2023-02-08T11:45:29.010+01:00',
      currency: 'EUR',
      customer,
      nominalAccount: account,
    },
    office: '1234',
    riskLine: {
      availableAmount: '1020',
      client: 'BUC-1234567',
      currency: 'EUR',
      expires: '2020-06-26T00:00:00.000+02:00',
      iban: '0049 3295 2020 15792',
      limitAmount: '1020',
      riskLineId: '001',
      status: 'approved',
    },
  },
  savedStep: 2,
};
