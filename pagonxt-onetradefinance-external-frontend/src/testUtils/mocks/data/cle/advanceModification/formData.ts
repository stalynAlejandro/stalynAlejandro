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
    comments: 'mis comentarios',
    exportCollectionAdvance: {
      amount: '4000.0',
      approvalDate: '2022-10-24T09:20:55.327+02:00',
      code: 'CLE-ADV-14',
      contractReference: 'refCLE-ADV-030',
      creationDate: '2022-10-22T09:20:55.327+02:00',
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
    office: '1234',
    riskLine: {
      availableAmount: '1020',
      client: customer.personNumber,
      currency: 'EUR',
      expires: '2020-06-26T00:00:00.000+02:00',
      iban: '0049 3295 2020 15792',
      id: '001',
      limitAmount: '1020',
      riskLineId: '001',
      status: 'approved',
    },
  },
  savedStep: 3,
};
