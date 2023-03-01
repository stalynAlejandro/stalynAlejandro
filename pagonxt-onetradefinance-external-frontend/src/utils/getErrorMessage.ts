import { ValidationErrorDto } from '../api/types/ValidationErrorDto';
import i18n from '../i18n';
import { formatDate, isValidDate } from './dates';

interface GetErrorMessageOpts {
  context?: string;
  rawText?: boolean;
}

const getViolationWithContext = (key: string, context: string) =>
  !!context && i18n.exists(`${context}.${key}`, { ns: 'violations' })
    ? `${context}.${key}`
    : key;

const getViolationLimit = (
  limit: string | undefined,
  { context = '' }: GetErrorMessageOpts,
) => {
  if (!limit) {
    return '';
  }
  const ns = 'violations';

  // Field that has to be translated
  const withContext = getViolationWithContext(limit, context || 'fields');
  if (i18n.exists(withContext, { ns })) {
    return i18n.t(withContext, { ns });
  }

  // Date that has to be formatted
  if (isValidDate(limit)) {
    return formatDate(new Date(limit));
  }

  // String or Number: as is
  return limit;
};

const getViolationErrorMessage = (
  { fieldName, limit, parentFieldName, violation }: ValidationErrorDto,
  opts: GetErrorMessageOpts,
) => {
  const ns = 'violations';
  const { context = '' } = opts;

  const parent = parentFieldName
    ? i18n.t(
        getViolationWithContext(`parentFields.${parentFieldName}`, context),
        { ns },
      )
    : null;
  const field = i18n.t(
    getViolationWithContext(`fields.${fieldName}`, context),
    { ns },
  );
  const fieldWithParent = parent
    ? i18n.t('fieldInParent', {
        field: `<span class="errorMessage__field">${field}</span>`,
        ns,
        parent: `<span class="errorMessage__parent">${parent}</span>`,
      })
    : `<span class="errorMessage__field">${field}</span>`;

  const message = i18n.t(`violations.${violation}`, {
    field: fieldWithParent,
    limit: `<span class="errorMessage__limit">${getViolationLimit(
      limit,
      opts,
    )}</span>`,
    ns,
  });

  return message;
};

const getErrorListHtml = (headerMessage: string, errorList: string[]) => {
  const headerHtml = `<p class="errorMessage__headerMessage">${i18n.t(
    headerMessage,
  )}</p>`;

  const errorListHtml = `<ul class="errorMessage__errorList"><li><span>${errorList.join(
    '</span></li><li><span>',
  )}</span></li></ul>`;

  return `<div class="errorMessage__validationError">${headerHtml}${errorListHtml}</div>`;
};

export const getErrorMessage = (
  err: any,
  options: GetErrorMessageOpts = {},
) => {
  // Options initialization
  const defaultOptions = { context: '', rawText: false };
  const opts = { ...defaultOptions, ...options };

  // Get default error i18n prefix
  const tErrorPrefix = 'errors.';
  // Get main error key/code coming in the response
  const errorKey = err?.parsedResponse?.errors?.[0]?.code;

  // Add the context prefix to the error key if any
  const messageWithContext = `${tErrorPrefix}${
    opts.context ? `${opts.context}.${errorKey}` : errorKey
  }`;

  // Translate initial error message or get default if does not exist
  const i18nMessage =
    errorKey && i18n.exists(messageWithContext)
      ? messageWithContext
      : 'errorOcurred';

  // If we are receiving one or multiple form validation errors, display them all
  const errorsData = err?.parsedResponse?.errors?.[0]?.data;
  if (errorKey === 'validationError' && !!errorsData?.[0]?.violation) {
    const errorList: string[] = [];
    (errorsData as ValidationErrorDto[]).forEach((violation) =>
      errorList.push(getViolationErrorMessage(violation, opts)),
    );

    // Return the error list as HTML
    return getErrorListHtml(i18nMessage, errorList);
  }

  // If there are no violation messages, just return the initial error message
  return opts.rawText ? i18nMessage : i18n.t(i18nMessage);
};
