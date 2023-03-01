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
    account,
    amount: '1234.00',
    comments: 'mis comentarios ',
    currency: {
      currency: 'GBP',
      id: 'GBP',
    },
    expirationDate: '',
    expirationDays: '35',
    expirationType: 'days',
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
    riskLine: {
      availableAmount: '1020',
      client: customer.personNumber,
      currency: 'EUR',
      expires: '2020-06-26T00:00:00.000+02:00',
      iban: '0049 3295 2020 15792',
      limitAmount: '1020',
      riskLineId: '001',
      status: 'approved',
    },
  },
  savedStep: 3,
};
