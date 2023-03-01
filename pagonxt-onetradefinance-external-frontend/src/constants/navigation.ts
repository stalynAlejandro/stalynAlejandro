export const appPathPrefix = '/app';

const Navigation = {
  forms: {
    cle: {
      advance: {
        completeInformation: `${appPathPrefix}/cle/advance/complete-information`,
        create: `${appPathPrefix}/cle/advance/create`,
      },
      advanceCancellation: {
        completeInformation: `${appPathPrefix}/cle/advance-cancellation/complete-information`,
        create: `${appPathPrefix}/cle/advance-cancellation/create`,
      },
      advanceModification: {
        completeInformation: `${appPathPrefix}/cle/advance-modification/complete-information`,
        create: `${appPathPrefix}/cle/advance-modification/create`,
      },
      modification: {
        completeInformation: `${appPathPrefix}/cle/modification/complete-information`,
        create: `${appPathPrefix}/cle/modification/create`,
      },
      otherOperations: {
        completeInformation: `${appPathPrefix}/cle/other-operations/complete-information`,
        create: `${appPathPrefix}/cle/other-operations/create`,
      },
      request: {
        completeInformation: `${appPathPrefix}/cle/request/complete-information`,
        create: `${appPathPrefix}/cle/request/create`,
      },
    },
    cli: {
      financingCancellation: {
        completeInformation: `${appPathPrefix}/cli/financing-cancellation/complete-information`,
        create: `${appPathPrefix}/cli/financing-cancellation/create`,
      },
      financingModification: {
        completeInformation: `${appPathPrefix}/cli/financing-modification/complete-information`,
        create: `${appPathPrefix}/cli/financing-modification/create`,
      },
      financingRequest: {
        completeInformation: `${appPathPrefix}/cli/financing/complete-information`,
        create: `${appPathPrefix}/cli/financing/create`,
      },
      modification: {
        completeInformation: `${appPathPrefix}/cli/modification/complete-information`,
        create: `${appPathPrefix}/cli/modification/create`,
      },
      otherOperations: {
        completeInformation: `${appPathPrefix}/cli/other-operations/complete-information`,
        create: `${appPathPrefix}/cli/other-operations/create`,
      },
      paymentAccountless: {
        completeInformation: `${appPathPrefix}/cli/payment-accountless/complete-information`,
        create: `${appPathPrefix}/cli/payment-accountless/create`,
      },
      paymentCharge: {
        completeInformation: `${appPathPrefix}/cli/payment-charge/complete-information`,
        create: `${appPathPrefix}/cli/payment-charge/create`,
      },
      paymentFinancing: {
        completeInformation: `${appPathPrefix}/cli/payment-financing/complete-information`,
        create: `${appPathPrefix}/cli/payment-financing/create`,
      },
      request: {
        completeInformation: `${appPathPrefix}/cli/request/complete-information`,
        create: `${appPathPrefix}/cli/request/create`,
      },
    },
  },
  help: `${appPathPrefix}/help`,
  newRequests: `${appPathPrefix}/new-requests`,
  pendingTasks: `${appPathPrefix}/pending-tasks`,
  queryOfRequests: `${appPathPrefix}/requests-query`,
  requestDetails: `${appPathPrefix}/request-details`,
  taskDetails: `${appPathPrefix}/task-details`,
  taxAndCredit: `${appPathPrefix}/tax-and-credit`,
};

export default Navigation;
