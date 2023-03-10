import { summarizeNewAdvanceCollection } from '../../../mappers/summarizers/summarizeNewAdvanceCollection';
import { formatDate } from '../../../../utils/dates';
import { formatNumber } from '../../../../utils/formatNumber';
import { formData } from '../../../../testUtils/mocks/data/cle/advance/formData';
import { CreateFormDataDto } from '../../../../api/types/cle/advance/CreateFormDataDto';

describe('Helper summarizeNewAdvanceCollection', () => {
  const castedFormData = formData as CreateFormDataDto;

  it('returns a title with no sections if no formData is provided', () => {
    const summary = summarizeNewAdvanceCollection(undefined);
    expect(summary.title).toEqual('T_summaryTitle');
  });

  it('section onEdit method returns null if none is provided', () => {
    const summary = summarizeNewAdvanceCollection(castedFormData);

    expect(
      summary.sections.find((s) => s.key === 'request')?.onEdit!(),
    ).toBeNull();
    expect(
      summary.sections.find((s) => s.key === 'documentation')?.onEdit!(),
    ).toBeNull();
  });

  it('section onEdit method is executed with the correct step number', () => {
    const onEdit = jest.fn();
    const summary = summarizeNewAdvanceCollection(
      castedFormData,
      undefined,
      onEdit,
    );

    summary.sections.find((s) => s.key === 'request')?.onEdit!();
    summary.sections.find((s) => s.key === 'documentation')?.onEdit!();

    expect(onEdit).toHaveBeenCalledWith(1);
    expect(onEdit).toHaveBeenCalledWith(2);
  });

  it('renders all steps if none is provided', () => {
    const summary = summarizeNewAdvanceCollection(castedFormData);

    expect(summary.sections).toHaveLength(3);
    expect(summary.sections[0].key).toEqual('customer');
    expect(summary.sections[1].key).toEqual('request');
    expect(summary.sections[2].key).toEqual('documentation');
  });

  it('renders only specified steps', () => {
    const customerSummary = summarizeNewAdvanceCollection(castedFormData, [
      'customer',
    ]);

    expect(customerSummary.sections).toHaveLength(1);
    expect(customerSummary.sections[0].key).toEqual('customer');

    const twoSummaries = summarizeNewAdvanceCollection(castedFormData, [
      'request',
      'documentation',
    ]);

    expect(twoSummaries.sections).toHaveLength(2);
    expect(twoSummaries.sections[0].key).toEqual('request');
    expect(twoSummaries.sections[1].key).toEqual('documentation');
  });

  it('generates general properties correctly', () => {
    const { title } = summarizeNewAdvanceCollection(castedFormData);
    expect(title).toEqual('T_summaryTitle');
  });

  it('summarizes customer content correctly', () => {
    const {
      sections: [customer],
    } = summarizeNewAdvanceCollection(castedFormData, ['customer']);

    expect(customer).toEqual({
      fields: [
        {
          label: 'client',
          value: castedFormData.customer.name,
        },
      ],
      key: 'customer',
    });
  });

  it('summarizes request content correctly', () => {
    const {
      sections: [request],
    } = summarizeNewAdvanceCollection(castedFormData, ['request']);

    const [
      requestRef,
      contractRef,
      amount,
      requestDate,
      advanceAmount,
      exchangeInsuranceOne,
      exchangeInsuranceTwo,
      expiration,
      riskLine,
      office,
      comments,
    ] = request.fields;
    expect(request.title).toEqual('requestDetails');
    expect(request.key).toEqual('request');

    expect(requestRef).toEqual({
      label: 'requestRef',
      value: castedFormData.request.exportCollection.code,
    });
    expect(contractRef).toEqual({
      label: 'contractRef',
      value: castedFormData.request.exportCollection.contractReference,
    });
    expect(amount.label).toEqual('amount');
    expect(requestDate).toEqual({
      label: 'requestDate',
      value: formatDate(
        new Date(castedFormData.request.exportCollection.creationDate!),
      ),
    });
    expect(advanceAmount.label).toEqual('advanceAmount');

    const insuranceOne = castedFormData.request.exchangeInsurances![0];
    expect(exchangeInsuranceOne).toEqual({
      label: `T_exchangeInsuranceIdNShort--id:${insuranceOne.exchangeInsuranceId}`,
      value: `${formatNumber(insuranceOne.exchangeRate, 4)} (${formatNumber(
        insuranceOne.useAmount,
      )} ${insuranceOne.buyCurrency})`,
    });

    const insuranceTwo = castedFormData.request.exchangeInsurances![1];
    expect(exchangeInsuranceTwo).toEqual({
      label: `T_exchangeInsuranceIdNShort--id:${insuranceTwo.exchangeInsuranceId}`,
      value: `${formatNumber(insuranceTwo.exchangeRate, 4)} (${formatNumber(
        insuranceTwo.useAmount,
      )} ${insuranceTwo.buyCurrency})`,
    });

    expect(expiration).toEqual({
      label: 'expiration',
      value: formatDate(new Date(castedFormData.request.requestExpiration)),
    });
    expect(riskLine).toEqual({
      label: 'riskLine',
      value: castedFormData.request.riskLine.iban,
    });
    expect(office).toEqual({
      label: 'office',
      value: castedFormData.request.office,
    });
    expect(comments).toEqual({
      collapsible: true,
      label: 'comments',
      value: castedFormData.request.comments,
    });
  });

  it('summarizes documentation content correctly', () => {
    const {
      sections: [documentation],
    } = summarizeNewAdvanceCollection(castedFormData, ['documentation']);

    expect(documentation.key).toEqual('documentation');
    expect(documentation.title).toEqual('documentationAndPriority');
    expect(documentation.fields).toEqual([
      {
        label: 'documentation',
        value: `T_nFilesAttached--files:${castedFormData.documentation.files.length}`,
      },
      {
        label: 'priority',
        value: `T_${castedFormData.documentation.priority}`,
      },
    ]);
  });
});
