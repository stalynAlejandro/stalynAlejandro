import apiUrls from '../constants/apiUrls';
import eventTypes, { EventTypes } from '../enums/eventTypes';
import productTypes, { ProductTypes } from '../enums/productTypes';

export const getOperationApiUrl = (
  product: ProductTypes,
  event: EventTypes,
  operation: string,
) => {
  let productUrls;
  let eventUrls;

  if (product === productTypes.CLE) {
    productUrls = apiUrls.cle;
    if (event === eventTypes.REQUEST) {
      eventUrls = productUrls.request;
    } else if (event === eventTypes.MODIFICATION) {
      eventUrls = productUrls.modification;
    } else if (event === eventTypes.ADVANCE) {
      eventUrls = productUrls.advance;
    } else if (event === eventTypes.ADVANCE_MODIFICATION) {
      eventUrls = productUrls.advanceModification;
    } else if (event === eventTypes.ADVANCE_CANCELLATION) {
      eventUrls = productUrls.advanceCancellation;
    } else if (event === eventTypes.OTHER_OPERATIONS) {
      eventUrls = productUrls.otherOperations;
    }
  } else if (product === productTypes.CLI) {
    productUrls = apiUrls.cli;
    if (event === eventTypes.REQUEST) {
      eventUrls = productUrls.request;
    } else if (event === eventTypes.MODIFICATION) {
      eventUrls = productUrls.modification;
    } else if (event === eventTypes.PAYMENT_CHARGE) {
      eventUrls = productUrls.paymentCharge;
    } else if (event === eventTypes.PAYMENT_ACCOUNTLESS) {
      eventUrls = productUrls.paymentAccountless;
    } else if (event === eventTypes.PAYMENT_FINANCING) {
      eventUrls = productUrls.paymentFinancing;
    } else if (event === eventTypes.FINANCING_REQUEST) {
      eventUrls = productUrls.financingRequest;
    } else if (event === eventTypes.FINANCING_MODIFICATION) {
      eventUrls = productUrls.financingModification;
    } else if (event === eventTypes.FINANCING_CANCELLATION) {
      eventUrls = productUrls.financingCancellation;
    } else if (event === eventTypes.OTHER_OPERATIONS) {
      eventUrls = productUrls.otherOperations;
    }
  }

  if (!eventUrls) {
    return undefined;
  }

  return eventUrls[operation as keyof typeof eventUrls] as any;
};
