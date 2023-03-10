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

export const formData = {
  code: 'CLE-1234',
  customer,
  documentation: {
    clientAcceptance: true,
    files: [mockFile()],
    priority: 'urgent',
  },
  request: {
    comments: 'My comments',
    exportCollection: {
      amount: '2323.0',
      approvalDate: '2022-07-20T15:28:40.865+02:00',
      code: 'CLE-17',
      contractReference: '287362873628376',
      creationDate: '2022-07-18T15:28:40.865+02:00',
      currency: 'EUR',
      customer,
      nominalAccount: {
        currency: 'EUR',
        iban: 'PT50 0002 0123 5678 9015 1',
        id: '001001',
      },
    },
    office: '1234',
  },
  savedStep: 3,
};
