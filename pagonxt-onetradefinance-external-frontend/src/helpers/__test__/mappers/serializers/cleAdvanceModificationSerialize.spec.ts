import { formData } from '../../../../testUtils/mocks/data/cle/advanceModification/formData';
import { serializeCleAdvanceModification } from '../../../mappers/serializers/cle/advanceModification/serialize';

describe('Serializer CLE Advance Modification serialize', () => {
  it('returns the expected result', async () => {
    const result = await serializeCleAdvanceModification(formData);

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
