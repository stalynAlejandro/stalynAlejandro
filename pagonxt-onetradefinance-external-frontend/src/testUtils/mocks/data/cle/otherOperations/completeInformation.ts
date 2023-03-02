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
      code: 'CLE-OTH-7',
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
        comments: null,
        exportCollection: {
          amount: '2222.0',
          approvalDate: '2022-10-25T08:30:38.794+02:00',
          code: 'CLE-79',
          contractReference: 'REF-1234567890',
          creationDate: null,
          currency: 'EUR',
          customer,
          nominalAccount: {
            currency: 'EUR',
            iban: 'PT50 0002 0123 5678 9015 1',
            id: '001001',
          },
        },
        office: '1234',
        operationType: 'exportUnpaid',
      },
    },
    requestCreationTime: '2022-10-25T09:54:17.235+02:00',
    requestCreatorName: 'Office',
    returnComment:
      '- La cuenta del cliente tiene avisos que impiden dar de alta la solicitud',
    returnReason: 'accountWithWarnings',
    taskCreationTime: '2022-10-25T10:08:48.648+02:00',
  },
  key: 'getCompleteInfoExportCollectionOtherOperationsRequest',
  message: null,
  type: 'success',
};
