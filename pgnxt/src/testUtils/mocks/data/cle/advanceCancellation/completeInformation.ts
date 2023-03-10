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
      code: 'CLE-ADV-CAN-1',
      customer,
      displayedStatus: 'AWAITING_INSTRUCTIONS',
      documentation: {
        clientAcceptance: false,
        files: [
          {
            data: null,
            documentType: null,
            id: 'CON-ca89bb83-721f-11ed-9d7c-16d2aa8bb8db',
            name: 'Doc 2.pdf',
            uploadedDate: '2022-12-02T10:00:38.593+01:00',
          },
        ],
        priority: 'urgent',
      },
      request: {
        comments: 'My Comments',
        exportCollectionAdvance: {
          amount: '200.0',
          approvalDate: '2022-11-30T14:00:00.218+01:00',
          code: 'CLE-ADV-1',
          contractReference: '12345678909876',
          creationDate: '2022-11-30T10:30:32.111+01:00',
          currency: 'EUR',
          customer,
          exportCollection: {
            amount: '1234.0',
            approvalDate: '2022-11-30T14:00:00.177+01:00',
            code: 'CLE-8',
            contractReference: '12345678909876',
            creationDate: '2022-11-30T10:30:32.111+01:00',
            currency: 'EUR',
            customer: {
              customerId: '001',
              email: 'mock email 1',
              name: 'Coca Cola S.L.',
              office: '1234',
              personNumber: 'BUC-1234567',
              segment: 'SME',
              taxId: 'B1234567',
            },
            nominalAccount: {
              currency: 'EUR',
              iban: 'PT50 0002 0123 5678 9015 1',
              id: '001001',
            },
          },
          requestExpiration: '2022-12-01T00:00:00.000+01:00',
        },
        office: '1234',
      },
    },
    requestCreationTime: '2022-12-02T10:00:39.270+01:00',
    requestCreatorName: 'Marta',
    returnComment: '- Los documentos adjuntos no corresponden con la solicitud',
    returnReason: 'wrongDocumentation',
    taskCreationTime: '2022-12-02T10:01:16.311+01:00',
  },
  key: 'getCompleteInfoExportCollectionAdvanceCancellationRequest',
  message: null,
  type: 'success',
};
