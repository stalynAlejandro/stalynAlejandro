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
    amount: '1234.00',
    clientAccount: account,
    comments: 'mis comentarios ',
    commissionAccount: account,
    currency: {
      currency: 'GBP',
      id: 'GBP',
    },
    exchangeInsurances: [
      {
        buyAmount: '2000.0',
        buyCurrency: 'GBP',
        exchangeInsuranceId: '7763095',
        exchangeRate: '1.1623',
        sellAmount: '2364.61',
        sellCurrency: 'EUR',
        state: 'CONFIRMED',
        type: 'FORWARD',
        useAmount: '1500.00',
        useDate: '2022-06-30T00:00:00.000+02:00',
      },
      {
        buyAmount: '2000.0',
        buyCurrency: 'GBP',
        exchangeInsuranceId: '7763022',
        exchangeRate: '1.1614',
        sellAmount: '5555.62',
        sellCurrency: 'EUR',
        state: 'CONFIRMED',
        type: 'FORWARD',
        useAmount: '2000.00',
        useDate: '2022-06-30T00:00:00.000+02:00',
      },
    ],
    importCollection: {
      amount: '12000.0',
      approvalDate: '2022-10-24T12:34:56.693+02:00',
      code: 'CLI-33',
      contractReference: 'refCLI-REQ-033',
      creationDate: '2022-10-24T12:20:11.539+02:00',
      currency: 'EUR',
      customer,
      nominalAccount: account,
    },
    office: '1234',
  },
  savedStep: 3,
};
