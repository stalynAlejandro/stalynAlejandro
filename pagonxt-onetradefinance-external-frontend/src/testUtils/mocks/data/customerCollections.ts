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
    amount: '12000.0',
    approvalDate: '2022-10-24T12:34:56.693+02:00',
    code: 'CLE-33',
    contractReference: 'refCLE-REQ-033',
    creationDate: '2022-10-24T12:20:11.539+02:00',
    currency: 'EUR',
    customer,
    nominalAccount: {
      currency: 'EUR',
      iban: 'PT50 0002 0123 5678 9015 1',
      id: '001001',
    },
  },
  {
    amount: '100000.0',
    approvalDate: '2022-10-24T14:13:18.674+02:00',
    code: 'CLE-36',
    contractReference: 'refCLE-REQ-036',
    creationDate: '2022-10-24T14:11:06.853+02:00',
    currency: 'EUR',
    customer,
    nominalAccount: {
      currency: 'EUR',
      iban: 'PT50 0002 0123 5678 9015 1',
      id: '001001',
    },
  },
  {
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
];
