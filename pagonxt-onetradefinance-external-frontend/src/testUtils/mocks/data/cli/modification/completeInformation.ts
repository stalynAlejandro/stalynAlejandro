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
      code: 'CLE-MOD-10',
      comments: 'My comments',
      customer,
      documentation: {
        clientAcceptance: false,
        files: [
          {
            data: undefined,
            documentType: undefined,
            id: 'CON-650b4a7c-397c-11ed-9717-0a6ac5e3f78d',
            name: 'prices_chart.pdf',
            uploadedDate: '2022-09-21T09:09:55.232+02:00',
          },
        ],
        priority: 'urgent',
      },
      importCollection: {
        amount: '2222.0',
        approvalDate: '2022-09-22T12:29:03.184+02:00',
        code: 'CLI-62',
        contractReference: '12345678912345',
        creationDate: '2022-09-20T12:29:03.184+02:00',
        currency: 'EUR',
        customer,
        nominalAccount: {
          currency: 'PLN',
          iban: 'PT50 0002 0123 5678 9015 2',
          id: '001002',
        },
      },
      office: '1234',
    },
    requestCreationTime: '2022-09-21T09:09:56.667+02:00',
    requestCreatorName: 'Office',
    returnComment: '- No se especifica la forma de pago de la remesa',
    returnReason: 'paymentMethod',
    taskCreationTime: '2022-09-21T09:10:47.139+02:00',
  },
  key: 'getCompleteInfoImportCollectionModificationRequest',
  message: null,
  type: 'success',
};
