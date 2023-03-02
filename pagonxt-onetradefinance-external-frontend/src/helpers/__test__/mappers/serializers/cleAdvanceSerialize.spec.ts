import { formData } from '../../../../testUtils/mocks/data/cle/advance/formData';
import { serializeNewAdvanceCollection } from '../../../mappers/serializers/cle/advance/serialize';

describe('Serializer CLE Advance serialize', () => {
  it('returns the expected result', async () => {
    const result = await serializeNewAdvanceCollection(formData);

    expect(result.code).toEqual(formData.code);
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
