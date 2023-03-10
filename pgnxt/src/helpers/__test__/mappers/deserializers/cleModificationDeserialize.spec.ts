import { get } from '../../../../testUtils/mocks/data/cle/modification/completeInformation';
import { deserializeModifyCollection } from '../../../mappers/deserializers/cle/modification/deserialize';

describe('Deserializer CLE Modification deserialize', () => {
  const request = get.entity.request as any;

  it('returns the expected result', () => {
    const result = deserializeModifyCollection(request);

    expect(result.code).toEqual(request.code);
    expect(result.customer).toEqual(request.customer);
    expect(result.documentation).toEqual(request.documentation);
    expect(result.request.comments).toEqual(request.comments);
    expect(result.request.exportCollection).toEqual(request.exportCollection);
    expect(result.request.office).toEqual(request.office);
  });
});
