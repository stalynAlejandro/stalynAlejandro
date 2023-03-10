import ApiUrls from '../../constants/apiUrls';
import { EventTypes } from '../../enums/eventTypes';
import { ProductTypes } from '../../enums/productTypes';
import { getOperationApiUrl } from '../getOperationApiUrl';

describe('Util getOperationApiUrl', () => {
  it('returns undefined if the product does not exist', () => {
    expect(
      getOperationApiUrl('PRD' as ProductTypes, 'ADVANCE', 'get'),
    ).toBeUndefined();
  });

  it('returns undefined if the event does not exist', () => {
    expect(
      getOperationApiUrl('CLE', 'TEST' as EventTypes, 'get'),
    ).toBeUndefined();
  });

  it('returns the specified operation api url for the specified product and event', () => {
    expect(getOperationApiUrl('CLE', 'ADVANCE', 'create')).toEqual(
      ApiUrls.cle.advance.create,
    );
    expect(getOperationApiUrl('CLE', 'ADVANCE', 'details')).toEqual(
      ApiUrls.cle.advance.details,
    );
    expect(getOperationApiUrl('CLE', 'REQUEST', 'completeInformation')).toEqual(
      ApiUrls.cle.request.completeInformation,
    );
    expect(getOperationApiUrl('CLE', 'MODIFICATION', 'create')).toEqual(
      ApiUrls.cle.modification.create,
    );
    expect(
      getOperationApiUrl('CLE', 'ADVANCE_CANCELLATION', 'details'),
    ).toEqual(ApiUrls.cle.advanceCancellation.details);
  });
});
