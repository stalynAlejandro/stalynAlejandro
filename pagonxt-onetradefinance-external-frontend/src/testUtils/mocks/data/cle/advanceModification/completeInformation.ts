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
      code: 'CLE-ADV-MOD-1',
      customer,
      displayedStatus: 'AWAITING_INSTRUCTIONS',
      documentation: {
        clientAcceptance: false,
        files: [
          {
            data: null,
            documentType: null,
            id: 'CON-1759d995-7150-11ed-9045-b2a4e235a7ad',
            name: 'prices_chart.pdf',
            uploadedDate: '2022-12-01T09:13:52.144+01:00',
          },
        ],
        priority: 'urgent',
      },
      request: {
        comments: 'Response comments',
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
            customer,
            nominalAccount: {
              currency: 'EUR',
              iban: 'PT50 0002 0123 5678 9015 1',
              id: '001001',
            },
          },
          requestExpiration: '2022-12-01T00:00:00.000+01:00',
        },
        office: '1234',
        riskLine: {
          availableAmount: '1020.00',
          client: null,
          currency: 'EUR',
          expires: '2020-06-26T00:00:00.000+02:00',
          iban: '0049 3295 2020 15792',
          limitAmount: null,
          riskLineId: '001',
          status: null,
        },
      },
    },
    requestCreationTime: '2022-12-01T09:13:52.980+01:00',
    requestCreatorName: 'Marta',
    returnComment:
      '- La propuesta se encuentra sobregirada (no tiene saldo disponible para la financiación)',
    returnReason: 'proposalOverdrawn',
    taskCreationTime: '2022-12-01T09:14:47.078+01:00',
  },
  key: 'getCompleteInfoExportCollectionAdvanceModificationRequest',
  message: null,
  type: 'success',
};
