import i18n from '../../i18n';
import { formatDate } from '../dates';
import { getErrorMessage } from '../getErrorMessage';

const commonErrorEntity = {
  parsedResponse: {
    errors: [
      {
        code: 'anotherError',
        data: null,
        description: '',
        level: 'error',
        message: 'Error connecting with external API',
      },
    ],
  },
};

const validationErrorEntity = {
  parsedResponse: {
    errors: [
      {
        code: 'validationError',
        data: [
          {
            fieldName: 'expiration',
            limit: '2022-11-03T12:55:17.282+01:00',
            parentFieldName: null,
            violation: 'minDate',
          },
          {
            fieldName: 'advanceAmount',
            limit: 'amount',
            parentFieldName: null,
            violation: 'maxField',
          },
        ],
        description: '',
        level: 'error',
        message: 'There are validation errors',
      },
    ],
  },
};

describe('Util getErrorMessage', () => {
  const commonErrorCode = commonErrorEntity.parsedResponse.errors[0].code;
  const errorsList = validationErrorEntity.parsedResponse.errors[0].data;

  beforeEach(() => {
    jest
      .spyOn(i18n, 'exists')
      .mockImplementation(
        (str) =>
          !!str &&
          Number.isNaN(parseInt((str as string).split('.').at(-1)![0], 10)),
      );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Common behaviour', () => {
    it('returns the error message in the response', () => {
      expect(getErrorMessage(commonErrorEntity)).toEqual(
        `T_errors.${commonErrorCode}`,
      );
    });

    it('returns the error message with the specified context', () => {
      expect(getErrorMessage(commonErrorEntity, { context: 'contxt' })).toEqual(
        `T_errors.contxt.${commonErrorCode}`,
      );
    });

    it('returns the string without translating when rawText option is provided', () => {
      expect(getErrorMessage(commonErrorEntity, { rawText: true })).toEqual(
        `errors.${commonErrorCode}`,
      );
    });

    it('returns a generic error message if the translation of the error in the response does not exist', () => {
      jest.spyOn(i18n, 'exists').mockImplementation(() => false);
      expect(getErrorMessage(commonErrorEntity)).toEqual(`T_errorOcurred`);
    });
  });

  describe('Validation errors', () => {
    it('snapshot validation', () => {
      const errorHtml = getErrorMessage(validationErrorEntity, {
        context: 'ctxt',
      });

      expect(errorHtml).toEqual(
        `<div class="errorMessage__validationError"><p class="errorMessage__headerMessage">T_errors.ctxt.validationError</p><ul class="errorMessage__errorList"><li><span>T_violations.minDate--field:<span class="errorMessage__field">T_ctxt.fields.expiration</span>--limit:<span class="errorMessage__limit">03/11/2022</span></span></li><li><span>T_violations.maxField--field:<span class="errorMessage__field">T_ctxt.fields.advanceAmount</span>--limit:<span class="errorMessage__limit">T_ctxt.amount</span></span></li></ul></div>`,
      );
    });

    it('returns an HTML string with a list of errors', () => {
      const errorHtml = getErrorMessage(validationErrorEntity);

      expect(
        errorHtml.includes('<ul class="errorMessage__errorList">'),
      ).toBeTruthy();
      expect(errorHtml.includes('<li>')).toBeTruthy();
      expect(errorHtml.includes('T_violations.minDate')).toBeTruthy();
      expect(errorHtml.includes('T_fields.expiration')).toBeTruthy();
    });

    it('returns the list of errors taking into account the context provided', () => {
      const errorHtml = getErrorMessage(validationErrorEntity, {
        context: 'ctxt',
      });

      expect(errorHtml.includes('T_errors.ctxt.validationError')).toBeTruthy();
      expect(errorHtml.includes('T_ctxt.fields.expiration')).toBeTruthy();
      expect(errorHtml.includes('T_ctxt.fields.advanceAmount')).toBeTruthy();
      expect(errorHtml.includes('T_ctxt.amount')).toBeTruthy();
    });

    it('formats dates received as a limit', () => {
      const errorHtml = getErrorMessage(validationErrorEntity);

      expect(
        errorHtml.includes(formatDate(new Date(errorsList[0].limit))),
      ).toBeTruthy();
    });
  });
});
