export const apiFilters = {
  code: {
    options: null,
    type: 'text',
  },
  currency: {
    options: [
      {
        code: 'EUR',
        description: 'currency_EUR',
      },
      {
        code: 'GBP',
        description: 'currency_GBP',
      },
    ],
    type: 'select',
  },
  customerName: {
    options: null,
    type: 'text',
  },
  customerPersonNumber: {
    options: null,
    type: 'text',
  },
  customerTaxId: {
    options: null,
    type: 'text',
  },
  eventId: {
    options: [
      {
        code: 'REQUEST',
        description: 'Request',
      },
      {
        code: 'MODIFICATION',
        description: 'Modification',
      },
      {
        code: 'ADVANCE',
        description: 'Advance',
      },
      {
        code: 'ADVANCE_MODIFICATION',
        description: 'Advance',
      },
      {
        code: 'ADVANCE_CANCELLATION',
        description: 'Advance',
      },
    ],
    type: 'select',
  },
  fromAmount: {
    options: null,
    type: 'number',
  },
  fromDate: {
    options: null,
    type: 'date',
  },
  priority: {
    options: [
      {
        code: 'normal',
        description: 'Normal',
      },
      {
        code: 'urgent',
        description: 'Urgent',
      },
    ],
    type: 'select',
  },
  productId: {
    options: [
      {
        code: 'CLE',
        description: 'Export Collection',
      },
      {
        code: 'CLI',
        description: 'Import Collection',
      },
    ],
    type: 'select',
  },
  requesterName: {
    options: null,
    type: 'text',
  },
  taskId: {
    options: [
      {
        code: 'EXTERNAL_REQUEST_DRAFT',
        description: 'External Request Draft',
      },
      {
        code: 'COMPLETE_INFORMATION',
        description: 'Complete Information',
      },
    ],
    type: 'select',
  },
  toAmount: {
    options: null,
    type: 'number',
  },
  toDate: {
    options: null,
    type: 'date',
  },
};
