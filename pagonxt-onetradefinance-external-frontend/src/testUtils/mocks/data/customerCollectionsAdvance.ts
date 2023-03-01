const customer = {
  customerId: '001',
  email: 'mock email 1',
  name: 'Coca Cola S.L.',
  office: '1234',
  personNumber: 'BUC-1234567',
  segment: 'SME',
  taxId: 'B1234567',
};

export const get = [
  {
    amount: '4000.0',
    approvalDate: '2022-10-24T09:20:55.327+02:00',
    code: 'CLE-ADV-14',
    contractReference: 'refCLE-ADV-030',
    creationDate: null,
    currency: 'EUR',
    customer,
    exportCollection: {
      amount: '20000.0',
      approvalDate: '2022-10-24T09:20:55.311+02:00',
      code: 'CLE-30',
      contractReference: 'refCLE-REQ-030',
      creationDate: '2022-10-24T09:09:41.122+02:00',
      currency: 'EUR',
      customer,
      nominalAccount: {
        currency: 'EUR',
        iban: 'PT50 0002 0123 5678 9015 4',
        id: '001004',
      },
    },
    requestExpiration: '2022-10-28T00:00:00.000+02:00',
  },
  {
    amount: '200.0',
    approvalDate: '2022-10-24T10:36:33.354+02:00',
    code: 'CLE-ADV-15',
    contractReference: '12345678901234',
    creationDate: '2022-10-24T10:24:43.121+02:00',
    currency: 'EUR',
    customer,
    exportCollection: {
      amount: '20000.0',
      approvalDate: '2022-10-24T09:20:55.311+02:00',
      code: 'CLE-30',
      contractReference: 'refCLE-REQ-030',
      creationDate: '2022-10-24T09:09:41.122+02:00',
      currency: 'EUR',
      customer,
      nominalAccount: {
        currency: 'EUR',
        iban: 'PT50 0002 0123 5678 9015 4',
        id: '001004',
      },
    },
    requestExpiration: '2022-10-28T00:00:00.000+02:00',
  },
];
