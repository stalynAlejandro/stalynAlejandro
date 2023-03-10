import { CreateFormDataDto } from '../../../../api/types/cle/request/CreateFormDataDto';
import { formData } from '../../../../testUtils/mocks/data/cle/request/formData';
import { formatDate } from '../../../../utils/dates';
import { summarizeNewCollection } from '../../../mappers/summarizers/summarizeNewCollection';

describe('Helper summarizeNewCollection', () => {
  const castedFormData = formData as CreateFormDataDto;

  it('returns a title with no sections if no formData is provided', () => {
    const summary = summarizeNewCollection(undefined);
    expect(summary.title).toEqual('T_summaryTitle');
  });

  it('section onEdit method returns null if none is provided', () => {
    const summary = summarizeNewCollection(castedFormData);

    expect(
      summary.sections.find((s) => s.key === 'operationDetails')?.onEdit!(),
    ).toBeNull();
    expect(
      summary.sections.find((s) => s.key === 'advance')?.onEdit!(),
    ).toBeNull();
    expect(
      summary.sections.find((s) => s.key === 'documentation')?.onEdit!(),
    ).toBeNull();
  });

  it('section onEdit method is executed with the correct step number', () => {
    const onEdit = jest.fn();
    const summary = summarizeNewCollection(castedFormData, undefined, onEdit);

    summary.sections.find((s) => s.key === 'operationDetails')?.onEdit!();
    summary.sections.find((s) => s.key === 'advance')?.onEdit!();
    summary.sections.find((s) => s.key === 'documentation')?.onEdit!();

    expect(onEdit).toHaveBeenCalledWith(1);
    expect(onEdit).toHaveBeenCalledWith(2);
    expect(onEdit).toHaveBeenCalledWith(3);
  });

  it('renders all steps if none is provided', () => {
    const summary = summarizeNewCollection(castedFormData);

    expect(summary.sections).toHaveLength(4);
    expect(summary.sections[0].key).toEqual('customer');
    expect(summary.sections[1].key).toEqual('operationDetails');
    expect(summary.sections[2].key).toEqual('advance');
    expect(summary.sections[3].key).toEqual('documentation');
  });

  it('renders only specified steps', () => {
    const customerSummary = summarizeNewCollection(castedFormData, [
      'customer',
    ]);

    expect(customerSummary.sections).toHaveLength(1);
    expect(customerSummary.sections[0].key).toEqual('customer');

    const twoSummaries = summarizeNewCollection(castedFormData, [
      'operationDetails',
      'advance',
    ]);

    expect(twoSummaries.sections).toHaveLength(2);
    expect(twoSummaries.sections[0].key).toEqual('operationDetails');
    expect(twoSummaries.sections[1].key).toEqual('advance');
  });

  it('generates general properties correctly', () => {
    const { title } = summarizeNewCollection(castedFormData);
    expect(title).toEqual('T_summaryTitle');
  });

  it('summarizes customer content correctly', () => {
    const {
      sections: [customer],
    } = summarizeNewCollection(castedFormData, ['customer']);

    expect(customer).toEqual({
      fields: [
        {
          label: 'client',
          value: formData.customer.name,
        },
      ],
      key: 'customer',
    });
  });

  it('summarizes operationDetails content correctly', () => {
    const {
      sections: [operationDetails],
    } = summarizeNewCollection(castedFormData, ['operationDetails']);

    const [
      nominalAccount,
      commissionAccount,
      amount,
      collectionType,
      clientReference,
      debtorName,
      debtorBank,
      office,
      comments,
    ] = operationDetails.fields;
    expect(operationDetails.title).toEqual('operationDetails');
    expect(operationDetails.key).toEqual('operationDetails');

    expect(nominalAccount).toEqual({
      label: 'nominalAccount',
      value: formData.operationDetails.clientAccount.iban,
    });
    expect(commissionAccount).toEqual({
      label: 'commissionAccount',
      value: formData.operationDetails.commissionAccount.iban,
    });
    expect(amount.label).toEqual('amount');
    expect(collectionType).toEqual({
      label: 'collectionType',
      value: `T_collectionTypes.${formData.operationDetails.collectionType}`,
    });
    expect(clientReference).toEqual({
      label: 'clientReference',
      value: formData.operationDetails.clientReference,
    });
    expect(debtorName).toEqual({
      label: 'debtorName',
      value: formData.operationDetails.debtorName,
    });
    expect(debtorBank).toEqual({
      label: 'debtorBank',
      value: formData.operationDetails.debtorBank,
    });
    expect(office).toEqual({
      label: 'applicantOffice',
      value: formData.operationDetails.office,
    });
    expect(comments).toEqual({
      collapsible: true,
      label: 'comments',
      value: formData.operationDetails.comments,
    });
  });

  it('summarizes advance content correctly', () => {
    const {
      sections: [advance],
    } = summarizeNewCollection(castedFormData, ['advance']);

    const [amount, expiration, riskLine] = advance.fields;

    expect(advance.title).toEqual('advance');
    expect(advance.key).toEqual('advance');

    expect(amount.label).toEqual('amount');
    expect(expiration).toEqual({
      label: 'expiration',
      value: formatDate(new Date(formData.advance.advanceExpiration)),
    });
    expect(riskLine).toEqual({
      label: 'riskLine',
      value: formData.advance.riskLine.iban,
    });
  });

  it('summarizes documentation content correctly', () => {
    const {
      sections: [documentation],
    } = summarizeNewCollection(castedFormData, ['documentation']);

    expect(documentation.key).toEqual('documentation');
    expect(documentation.title).toEqual('documentationAndPriority');
    expect(documentation.fields).toEqual([
      {
        label: 'clientAcceptance',
        value: 'T_yes',
      },
      { label: 'acceptanceDoc', value: 'T_yes' }, // price letter documentation
      {
        label: 'documentation',
        value: `T_nFilesAttached--files:1`, // only non price-letter documentation
      },
      {
        label: 'priority',
        value: `T_${formData.documentation.priority}`,
      },
    ]);
  });
});
