import Navigation from '../../constants/navigation';
import { EventTypes } from '../../enums/eventTypes';
import { ProductTypes } from '../../enums/productTypes';
import { getOperationFormUrl } from '../getOperationFormUrl';

describe('Util getOperationFormUrl', () => {
  it('returns undefined if the product does not exist', () => {
    expect(
      getOperationFormUrl('PRD' as ProductTypes, 'ADVANCE', 'get'),
    ).toBeUndefined();
  });

  it('returns undefined if the event does not exist', () => {
    expect(
      getOperationFormUrl('CLE', 'TEST' as EventTypes, 'get'),
    ).toBeUndefined();
  });

  it('returns the specified form api url for the specified product and event', () => {
    expect(
      getOperationFormUrl('CLE', 'ADVANCE', 'completeInformation'),
    ).toEqual(Navigation.forms.cle.advance.completeInformation);
    expect(getOperationFormUrl('CLE', 'ADVANCE', 'create')).toEqual(
      Navigation.forms.cle.advance.create,
    );
    expect(
      getOperationFormUrl('CLE', 'REQUEST', 'completeInformation'),
    ).toEqual(Navigation.forms.cle.request.completeInformation);
    expect(getOperationFormUrl('CLE', 'MODIFICATION', 'create')).toEqual(
      Navigation.forms.cle.modification.create,
    );
    expect(
      getOperationFormUrl('CLE', 'ADVANCE_CANCELLATION', 'create'),
    ).toEqual(Navigation.forms.cle.advanceCancellation.create);
  });
});
