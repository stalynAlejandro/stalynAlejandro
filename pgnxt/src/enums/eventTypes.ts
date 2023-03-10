const eventTypes = {
  ADVANCE: 'ADVANCE',
  ADVANCE_CANCELLATION: 'ADVANCE_CANCELLATION',
  ADVANCE_MODIFICATION: 'ADVANCE_MODIFICATION',
  FINANCING_CANCELLATION: 'FINANCING_CANCELLATION',
  FINANCING_MODIFICATION: 'FINANCING_MODIFICATION',
  FINANCING_REQUEST: 'FINANCING_REQUEST',
  MODIFICATION: 'MODIFICATION',
  OTHER_OPERATIONS: 'OTHER_OPERATIONS',
  PAYMENT_ACCOUNTLESS: 'PAYMENT_ACCOUNTLESS',
  PAYMENT_CHARGE: 'PAYMENT_CHARGE',
  PAYMENT_FINANCING: 'PAYMENT_FINANCING',
  REQUEST: 'REQUEST',
} as const;

export default eventTypes;

export type EventTypes = typeof eventTypes[keyof typeof eventTypes];

export const urlEventTypes = {
  advance: eventTypes.ADVANCE,
  'advance-cancellation': eventTypes.ADVANCE_CANCELLATION,
  'advance-modification': eventTypes.ADVANCE_MODIFICATION,
  financing: eventTypes.FINANCING_REQUEST,
  'financing-cancellation': eventTypes.FINANCING_CANCELLATION,
  'financing-modification': eventTypes.FINANCING_MODIFICATION,
  modification: eventTypes.MODIFICATION,
  'other-operations': eventTypes.OTHER_OPERATIONS,
  'payment-accountless': eventTypes.PAYMENT_ACCOUNTLESS,
  'payment-charge': eventTypes.PAYMENT_CHARGE,
  'payment-financing': eventTypes.PAYMENT_FINANCING,
  request: eventTypes.REQUEST,
};
