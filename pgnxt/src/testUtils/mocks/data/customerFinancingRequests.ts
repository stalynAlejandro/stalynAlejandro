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

export const get = [
  {
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
  {
    account: {
      currency: 'EUR',
      iban: 'PT50 0002 0123 5678 9015 2',
      id: '001002',
    },
    amount: '2222.0',
    approvalDate: '2022-10-25T08:30:38.794+02:00',
    code: 'CLI-FI-80',
    contractReference: 'REF-1234567892',
    creationDate: null,
    currency: 'EUR',
    customer,
    expirationDate: '2022-10-25T08:30:38.794+02:00',
    financingReference: '21324352',
    importCollection,
  },
  {
    account: {
      currency: 'EUR',
      iban: 'PT50 0002 0123 5678 9015 3',
      id: '001003',
    },
    amount: '2223.0',
    approvalDate: '2022-10-25T08:30:38.794+02:00',
    code: 'CLI-FI-81',
    contractReference: 'REF-1234567893',
    creationDate: null,
    currency: 'EUR',
    customer,
    expirationDate: '2022-10-25T08:30:38.794+02:00',
    financingReference: '21324353',
    importCollection,
  },
];
