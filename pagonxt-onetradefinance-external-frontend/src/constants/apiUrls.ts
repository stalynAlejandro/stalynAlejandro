import { EventTypes } from '../enums/eventTypes';
import { ProductTypes } from '../enums/productTypes';

const roots = {
  api: 'tf-api-repository',
  documentation: 'tf_documentation', // this one is with underscore as per Yaml contract
  flowable: 'tf-flowable-repository',
  local: 'api-tradeflow',
  process: 'tf-process-collection',
};

const getBaseUrl = (root: keyof typeof roots) => {
  // If there is no MSAL or there is no specified host for ApiGee, we're outisde PagoNxt authentication
  if (
    process.env.REACT_APP_USE_AUTHENTICATION !== 'msal' ||
    !process.env.REACT_APP_APIGEE_HOST
  ) {
    return `/${roots.local}`;
  }

  return `${process.env.REACT_APP_APIGEE_HOST}/${roots[root]}`;
};

const ApiUrls = {
  accounts: `${getBaseUrl('api')}/accounts`,
  cle: {
    advance: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/export-collection-advance-request?type=confirm`,
        get: (ref: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-request?type=draft&case_id=${ref}`,
        saveDraft: `${getBaseUrl('process')}/export-collection-advance-request`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/export-collection-advance-request?type=details&case_id=${requestId}`,
    },
    advanceCancellation: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-cancellation-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-cancellation-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-cancellation-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/export-collection-advance-cancellation-request?type=confirm`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/export-collection-advance-cancellation-request?type=details&case_id=${requestId}`,
    },
    advanceModification: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-modification-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-modification-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-advance-modification-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/export-collection-advance-modification-request?type=confirm`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/export-collection-advance-modification-request?type=details&case_id=${requestId}`,
    },
    modification: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-modification-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-modification-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-modification-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/export-collection-modification-request?type=confirm`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/export-collection-modification-request?type=details&case_id=${requestId}`,
    },
    otherOperations: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-other-operations-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-other-operations-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-other-operations-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/export-collection-other-operations-request?type=confirm`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/export-collection-other-operations-request?type=details&case_id=${requestId}`,
    },
    request: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/export-collection-request?type=confirm`,
        get: (ref: string) =>
          `${getBaseUrl(
            'process',
          )}/export-collection-request?type=draft&case_id=${ref}`,
        saveDraft: `${getBaseUrl('process')}/export-collection-request`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/export-collection-request?type=details&case_id=${requestId}`,
    },
  },
  cli: {
    financingCancellation: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-cancellation-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-cancellation-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-cancellation-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-financing-cancellation-request?type=confirm`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-financing-cancellation-request?type=details&case_id=${requestId}`,
    },
    financingModification: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-modification-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-modification-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-modification-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-financing-modification-request?type=confirm`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-financing-modification-request?type=details&case_id=${requestId}`,
    },
    financingRequest: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-financing-request?type=confirm`,
        get: (ref: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-financing-request?type=draft&case_id=${ref}`,
        saveDraft: `${getBaseUrl(
          'process',
        )}/import-collection-financing-request`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-financing-request?type=details&case_id=${requestId}`,
    },
    modification: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-modification-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-modification-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-modification-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-modification-request?type=confirm`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-modification-request?type=details&case_id=${requestId}`,
    },
    otherOperations: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-other-operations-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-other-operations-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-other-operations-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-other-operations-request?type=confirm`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-other-operations-request?type=details&case_id=${requestId}`,
    },
    paymentAccountless: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-accountless-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-accountless-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-accountless-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-payment-accountless-request?type=confirm`,
        get: (ref: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-accountless-request?type=draft&case_id=${ref}`,
        saveDraft: `${getBaseUrl(
          'process',
        )}/import-collection-payment-accountless-request`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-payment-accountless-request?type=details&case_id=${requestId}`,
    },
    paymentCharge: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-charge-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-charge-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-charge-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-payment-charge-request?type=confirm`,
        get: (ref: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-charge-request?type=draft&case_id=${ref}`,
        saveDraft: `${getBaseUrl(
          'process',
        )}/import-collection-payment-charge-request`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-payment-charge-request?type=details&case_id=${requestId}`,
    },
    paymentFinancing: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-financing-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-financing-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-financing-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-payment-financing-request?type=confirm`,
        get: (ref: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-payment-financing-request?type=draft&case_id=${ref}`,
        saveDraft: `${getBaseUrl(
          'process',
        )}/import-collection-payment-financing-request`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-payment-financing-request?type=details&case_id=${requestId}`,
    },
    request: {
      completeInformation: {
        cancel: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-request?type=complete-info-cancel&task_id=${taskId}`,
        complete: (taskId: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-request?type=complete-info-complete&task_id=${taskId}`,
        get: (taskId: string, forOperation: boolean = false) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-request?type=complete-info&task_id=${taskId}&for_operation=${forOperation}`,
      },
      create: {
        confirm: `${getBaseUrl(
          'process',
        )}/import-collection-request?type=confirm`,
        get: (ref: string) =>
          `${getBaseUrl(
            'process',
          )}/import-collection-request?type=draft&case_id=${ref}`,
        saveDraft: `${getBaseUrl('process')}/import-collection-request`,
      },
      details: (requestId: string) =>
        `${getBaseUrl(
          'process',
        )}/import-collection-request?type=details&case_id=${requestId}`,
    },
  },
  clients: `${getBaseUrl('api')}/clients`,
  collectionTypes: (productType: ProductTypes, currency: string) =>
    `${getBaseUrl(
      'api',
    )}/collection-types?product_id=${productType}&currency=${currency}`,
  currencies: (product: ProductTypes, event: EventTypes) =>
    `${getBaseUrl('api')}/currencies?product=${product}&event=${event}`,
  documents: `${getBaseUrl('documentation')}/documents`,
  exchangeInsurances: `${getBaseUrl('api')}/fx-deals`,
  exportAdvanceCollections: `${getBaseUrl(
    'flowable',
  )}/export-collection-advances`,
  exportCollections: `${getBaseUrl('flowable')}/export-collections`,
  importCollections: `${getBaseUrl('flowable')}/import-collections`,
  importFinancingRequests: `${getBaseUrl(
    'flowable',
  )}/import-financing-collections`,
  myRequests: `${getBaseUrl('flowable')}/retrieve-my-requests`,
  myRequestsFilters: `${getBaseUrl('flowable')}/retrieve-my-requests/filters`,
  operationTypes: `${getBaseUrl('api')}/operation-types`,
  pendingTasks: `${getBaseUrl('flowable')}/retrieve-my-tasks`,
  pendingTasksFilters: `${getBaseUrl('flowable')}/retrieve-my-tasks/filters`,
  pricesCharts: {
    cle: (requestId: string) =>
      `${getBaseUrl(
        'documentation',
      )}/prices-charts/export-collection?export_collection_id=${requestId}`,
    cli: (requestId: string) =>
      `${getBaseUrl(
        'documentation',
      )}/prices-charts/import-collection?import_collection_id=${requestId}`,
  },
  requestComments: (requestId: string, locale: string = 'es_es') =>
    `${getBaseUrl(
      'flowable',
    )}/case-data/${requestId}/comments?locale=${locale}`,
  requestHistoric: (requestId: string, locale: string = 'es_es') =>
    `${getBaseUrl(
      'flowable',
    )}/retrieve-historic-tasks?case_id=${requestId}&locale=${locale}`,
  riskLines: `${getBaseUrl('api')}/risk-lines`,
  userInfo: `${getBaseUrl('api')}/user-info`,
};

export default ApiUrls;
