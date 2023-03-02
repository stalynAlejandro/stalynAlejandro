import { formData } from '../../../../testUtils/mocks/data/cle/modification/formData';
import { serializeModifyCollection } from '../../../mappers/serializers/cle/modification/serialize';

describe('Serializer CLE Modification serialize', () => {
  const expectedSerializedData: any = {
    code: 'CLE-1234',
    comments: 'My comments',
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
      ],
      priority: 'urgent',
    },
    exportCollection: {
      amount: '2323.0',
      approvalDate: '2022-07-20T15:28:40.865+02:00',
      code: 'CLE-17',
      contractReference: '287362873628376',
      creationDate: '2022-07-18T15:28:40.865+02:00',
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
    office: '1234',
  };

  it('serializes the data object properly', async () => {
    const serializedData = await serializeModifyCollection(formData);
    expect(serializedData).toEqual(expectedSerializedData);
  });
});
