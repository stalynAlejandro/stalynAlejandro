import { formData } from '../../../../testUtils/mocks/data/cle/request/formData';
import { serializeNewCollection } from '../../../mappers/serializers/cle/request/serialize';

describe('Serializer CLE Request serialize', () => {
  const expectedSerializedData: any = {
    advance: {
      advanceAmount: '2323.00',
      advanceCurrency: { currency: 'EUR', id: 'EUR' },
      advanceExpiration: '2022-09-07T22:00:00.000Z',
      riskLine: {
        availableAmount: '1020',
        client: 'BUC-1234567',
        currency: 'EUR',
        expires: '2020-06-26T00:00:00.000+02:00',
        iban: '0049 3295 2020 15792',
        id: '001',
        limitAmount: '1020',
        riskLineId: '001',
        status: 'approved',
      },
    },
    customer: {
      customerId: '001',
      email: 'mock email 1',
      name: 'Coca Cola S.L.',
      office: '1234',
      personNumber: 'BUC-1234567',
      segment: 'SME',
      taxId: 'B1234567',
    },
    documentation: {
      clientAcceptance: true,
      files: [
        {
          ...formData.documentation.files[0],
          data: 'bXkgZmlsZSBjb250ZW50',
          name: formData.documentation.files[0].name,
        },
        {
          ...formData.documentation.files[1],
          data: 'bXkgZmlsZSBjb250ZW50',
          name: formData.documentation.files[1].name,
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
      clientReference: 'CL-REF-234',
      collectionAmount: '232323.00',
      collectionCurrency: { currency: 'EUR', id: 'EUR' },
      collectionType: 'DOCUMENTARY',
      comments: 'My comments',
      commissionAccount: {
        currency: 'PLN',
        iban: 'PT50 0002 0123 5678 9015 2',
        id: '001002',
      },
      debtorBank: 'Bank debt',
      debtorName: 'Name debt',
      hasAccount: true,
      office: '1234',
    },
    savedStep: 4,
  };

  it('serializes the data object properly', async () => {
    const serializedData = await serializeNewCollection(formData);
    expect(serializedData).toEqual(expectedSerializedData);
  });
});
