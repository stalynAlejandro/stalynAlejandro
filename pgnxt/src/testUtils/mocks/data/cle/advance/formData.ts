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
  code: 'CLE-ADV-123',
  customer,
  documentation: {
    files: [mockFile()],
    priority: 'urgent',
  },
  request: {
    advanceAmount: '2323.00',
    advanceCurrency: {
      currency: 'GBP',
      id: 'GBP',
    },
    comments: 'Mis comentarios',
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
    exportCollection: {
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
    office: '1234',
    requestExpiration: '2022-11-24T23:00:00.000Z',
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
  savedStep: 2,
};
