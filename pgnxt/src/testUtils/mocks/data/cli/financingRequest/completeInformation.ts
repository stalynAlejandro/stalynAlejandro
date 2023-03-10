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

export const get = {
  arguments: [],
  entity: {
    request: {
      code: 'MTR-14',
      customer,
      documentation: {
        clientAcceptance: false,
        files: [
          {
            data: null,
            documentType: null,
            id: 'CON-391e32be-543a-11ed-866c-0a6ac5e3f78d',
            name: 'Doc 1.pdf',
            uploadedDate: '2022-10-25T09:54:16.147+02:00',
          },
        ],
        priority: 'urgent',
      },
      request: {
        account,
        amount: '1234.00',
        comments: 'mis comentarios',
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
      savedStep: 2,
    },
    requestCreationTime: '2022-10-25T09:54:17.235+02:00',
    requestCreatorName: 'Office',
    returnComment:
      '- La cuenta del cliente tiene avisos que impiden dar de alta la solicitud',
    returnReason: 'accountWithWarnings',
    taskCreationTime: '2022-10-25T10:08:48.648+02:00',
  },
  key: 'getCompleteInfoImportCollectionFinancingRequest',
  message: null,
  type: 'success',
};
