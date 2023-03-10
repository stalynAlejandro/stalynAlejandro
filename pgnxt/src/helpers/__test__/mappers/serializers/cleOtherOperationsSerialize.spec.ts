import { formData } from '../../../../testUtils/mocks/data/cle/otherOperations/formData';
import { serializeNewOtherCollection } from '../../../mappers/serializers/cle/otherOperations/serialize';

describe('Serializer CLE Other Operations serialize', () => {
  it('returns the expected result', async () => {
    const result = await serializeNewOtherCollection(formData);

    expect(result.customer).toEqual(formData.customer);
    expect(result.request).toEqual(formData.request);
    expect(result.documentation).toEqual({
      ...formData.documentation,
      files: [
        {
          ...formData.documentation.files[0],
          data: 'bXkgZmlsZSBjb250ZW50',
          name: formData.documentation.files[0].name,
        },
      ],
    });
  });
});
