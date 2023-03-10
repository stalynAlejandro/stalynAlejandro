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

const importCollection = {
  amount: '2323.0',
  approvalDate: '2022-07-20T15:28:40.865+02:00',
  code: 'CLE-17',
  contractReference: null,
  creationDate: '2022-07-18T15:28:40.865+02:00',
  currency: 'EUR',
  customer,
};

export const formData = {
  code: 'CLI-1234',
  customer,
  documentation: {
    clientAcceptance: true,
    files: [mockFile()],
    priority: 'urgent',
  },
  request: {
    comments: 'My comments',
    financingRequest: {
      account: {
        currency: 'EUR',
        iban: 'PT50 0002 0123 5678 9015 1',
        id: '001001',
      },
      amount: '2221.0',
      approvalDate: '2022-10-25T08:30:38.794+02:00',
      code: 'CLI-FI-79',
      contractReference: 'REF-1234567891',
      creationDate: null,
      currency: 'EUR',
      customer,
      expirationDate: '2022-10-25T08:30:38.794+02:00',
      financingReference: '21324351',
      importCollection,
    },
    office: '1234',
    riskLine: {
      availableAmount: '1980',
      client: customer.personNumber,
      currency: 'EUR',
      expires: '2020-02-22T00:00:00.000+01:00',
      iban: '0049 3295 2020 28222',
      id: '001',
      limitAmount: '2120',
      riskLineId: '002',
      status: 'waiting',
    },
  },
  savedStep: 3,
};
