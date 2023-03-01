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
      code: 'CLI-PAY-FINAN-7',
      customer,
      documentation: {
        clientAcceptance: false,
        files: [
          {
            data: null,
            documentType: null,
            id: 'CON-321232b2-543a-11ed-862c-0o6oc5e3o78d',
            name: 'Doc 1.pdf',
            uploadedDate: '2022-10-25T09:54:16.147+00:00',
          },
        ],
        priority: 'urgent',
      },
      request: {
        amount: '1234.00',
        clientAccount: account,
        comments: 'comments',
        commissionAccount: account,
        currency: {
          currency: 'EUR',
          id: 'EUR',
        },
        exchangeInsurances: [
          {
            buyAmount: '2000.0',
            buyCurrency: 'EUR',
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
            buyCurrency: 'EUR',
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
        expirationDate: '',
        expirationDays: '10',
        expirationType: 'days',
        importCollection: {
          amount: '12000.0',
          approvalDate: '2022-10-24T12:34:56.693+00:00',
          code: 'CLI-33',
          contractReference: 'refCLI-PAY-FINAN-033',
          creationDate: '2022-10-24T12:20:11.539+02:00',
          currency: 'EUR',
          customer,
          nominalAccount: {
            currency: 'EUR',
            iban: 'EU50 1002 0123 5678 9015 1',
            id: '001001',
          },
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
    requestCreationTime: '2022-10-25T09:54:17.235+00:00',
    requestCreatorName: 'Office',
    returnComment:
      '- La cuenta del cliente tiene avisos que impiden dar de alta la solicitud',
    returnReason: 'accountWithWarnings',
    taskCreationTime: '2022-10-25T10:08:48.648+00:00',
  },
  key: 'getCompleteInfoImportCollectionPaymentFinancing',
  message: null,
  type: 'success',
};
