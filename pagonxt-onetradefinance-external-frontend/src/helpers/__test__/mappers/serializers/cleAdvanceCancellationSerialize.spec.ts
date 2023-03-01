import { formData } from '../../../../testUtils/mocks/data/cle/advanceCancellation/formData';
import { serializeCleAdvanceCancellation } from '../../../mappers/serializers/cle/advanceCancellation/serialize';

describe('Serializer CLE Advance Cancellation serialize', () => {
  it('returns the expected result', async () => {
    const result = await serializeCleAdvanceCancellation(formData);

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
