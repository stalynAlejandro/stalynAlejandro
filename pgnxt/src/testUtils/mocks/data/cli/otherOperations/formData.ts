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
  customer,
  documentation: {
    files: [mockFile()],
    priority: 'urgent',
  },
  request: {
    comments: 'mis comentarios ',
    importCollection: {
      amount: '12000.0',
      approvalDate: '2022-10-24T12:34:56.693+02:00',
      code: 'CLI-33',
      contractReference: 'refCLI-REQ-033',
      creationDate: '2022-10-24T12:20:11.539+02:00',
      currency: 'EUR',
      customer,
      nominalAccount: {
        currency: 'EUR',
        iban: 'PT50 0002 0123 5678 9015 1',
        id: '001001',
      },
    },
    office: '1234',
    operationType: 'exportReliquidations',
  },
  savedStep: 3,
};
