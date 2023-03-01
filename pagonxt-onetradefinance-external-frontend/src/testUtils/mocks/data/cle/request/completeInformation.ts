const customer = {
  customerId: '001',
  email: 'mock email 1',
  name: 'Coca Cola S.L.',
  office: '1234',
  personNumber: 'BUC-1234567',
  segment: 'SME',
  taxId: 'B1234567',
};

export const get = {
  arguments: [],
  entity: {
    request: {
      advance: {
        advanceAmount: 3333.0,
        advanceCurrency: {
          currency: 'EUR',
          id: 'EUR',
        },
        advanceExpiration: '2022-10-14T00:00:00.000+02:00',
        notEmpty: true,
        riskLine: {
          availableAmount: '1980',
          client: 'BUC-1234567',
          currency: 'EUR',
          expires: '2020-02-22T00:00:00.000+01:00',
          iban: '0049 3295 2020 28222',
          limitAmount: '2120',
          riskLineId: '002',
          status: 'waiting',
        },
      },
      code: 'CLE-44',
      contractReference: 'contractReference1',
      customer,
      displayedStatus: '',
      documentation: {
        clientAcceptance: true,
        files: [
          {
            data: null,
            documentType: 'letter',
            id: 'CON-91700ed5-1efe-11ed-88c1-0a6ac5e3f78d',
            name: 'prices_chart.pdf',
            uploadedDate: '2022-08-18T16:03:31.296+02:00',
          },
          {
            data: null,
            documentType: null,
            id: 'CON-91b24812-1efe-11ed-88c1-0a6ac5e3f78d',
            name: 'Ali Toygar - Roots.pdf',
            uploadedDate: '2022-08-18T16:03:33.933+02:00',
          },
        ],
        priority: 'urgent',
      },
      operationDetails: {
        clientAccount: {
          currency: 'EUR',
          iban: 'PT50 0002 0123 5678 9015 1',
          id: '001001',
        },
        clientReference: null,
        collectionAmount: 2323.0,
        collectionCurrency: {
          currency: 'EUR',
          id: 'EUR',
        },
        collectionType: 'DOCUMENTARY',
        comments: null,
        commissionAccount: {
          currency: 'PLN',
          iban: 'PT50 0002 0123 5678 9015 2',
          id: '001002',
        },
        debtorBank: null,
        debtorName: null,
        hasAccount: true,
        office: '1234',
      },
      savedStep: 3,
      slaEnd: '2022-08-22T12:00:00.000Z',
    },
    requestCreationTime: '2022-09-14T07:36:26.204Z',
    requestCreatorName: 'Status Author',
    returnComment:
      'Para continuar la petición es necesario cumplimentar toda la documentación obligatoria del alta',
    returnReason: 'missingDocumentation',
    taskCreationTime: '2022-09-14T07:36:26.204Z',
  },
  key: 'getExportCollectionRequestCompleteInfo',
  message: null,
  type: 'success',
};
