import { summarizeCleOtherOperationsCreation } from '../../../mappers/summarizers/summarizeCleOtherOperationsCreation';
import { formatDate } from '../../../../utils/dates';
import { formData } from '../../../../testUtils/mocks/data/cle/otherOperations/formData';

describe('Helper summarizeCleOtherOperationsCreation', () => {
  it('returns a title with no sections if no formData is provided', () => {
    const summary = summarizeCleOtherOperationsCreation(undefined);
    expect(summary.title).toEqual('T_summaryTitle');
  });

  it('section onEdit method returns null if none is provided', () => {
    const summary = summarizeCleOtherOperationsCreation(formData);

    expect(
      summary.sections.find((s) => s.key === 'request')?.onEdit!(),
    ).toBeNull();
    expect(
      summary.sections.find((s) => s.key === 'documentation')?.onEdit!(),
    ).toBeNull();
  });

  it('section onEdit method is executed with the correct step number', () => {
    const onEdit = jest.fn();
    const summary = summarizeCleOtherOperationsCreation(
      formData,
      undefined,
      onEdit,
    );

    summary.sections.find((s) => s.key === 'request')?.onEdit!();
    summary.sections.find((s) => s.key === 'documentation')?.onEdit!();

    expect(onEdit).toHaveBeenCalledWith(1);
    expect(onEdit).toHaveBeenCalledWith(2);
  });

  it('renders all steps if none is provided', () => {
    const summary = summarizeCleOtherOperationsCreation(formData);

    expect(summary.sections).toHaveLength(3);
    expect(summary.sections[0].key).toEqual('customer');
    expect(summary.sections[1].key).toEqual('request');
    expect(summary.sections[2].key).toEqual('documentation');
  });

  it('renders only specified steps', () => {
    const customerSummary = summarizeCleOtherOperationsCreation(formData, [
      'customer',
    ]);

    expect(customerSummary.sections).toHaveLength(1);
    expect(customerSummary.sections[0].key).toEqual('customer');

    const twoSummaries = summarizeCleOtherOperationsCreation(formData, [
      'request',
      'documentation',
    ]);

    expect(twoSummaries.sections).toHaveLength(2);
    expect(twoSummaries.sections[0].key).toEqual('request');
    expect(twoSummaries.sections[1].key).toEqual('documentation');
  });

  it('generates general properties correctly', () => {
    const { title } = summarizeCleOtherOperationsCreation(formData);
    expect(title).toEqual('T_summaryTitle');
  });

  it('summarizes customer content correctly', () => {
    const {
      sections: [customer],
    } = summarizeCleOtherOperationsCreation(formData, ['customer']);

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

  it('summarizes request content correctly', () => {
    const {
      sections: [request],
    } = summarizeCleOtherOperationsCreation(formData, ['request']);

    const [
      operationType,
      requestRef,
      contractRef,
      amount,
      requestDate,
      office,
      comments,
    ] = request.fields;
    expect(request.title).toEqual('requestDetails');
    expect(request.key).toEqual('request');

    expect(operationType).toEqual({
      label: 'operationType',
      value: `T_operationTypes.${formData.request.operationType}`,
    });
    expect(requestRef).toEqual({
      label: 'requestRef',
      value: formData.request.exportCollection.code,
    });
    expect(contractRef).toEqual({
      label: 'contractRef',
      value: formData.request.exportCollection.contractReference,
    });
    expect(amount.label).toEqual('amount');
    expect(requestDate).toEqual({
      label: 'requestDate',
      value: formatDate(
        new Date(formData.request.exportCollection.creationDate),
      ),
    });

    expect(office).toEqual({
      label: 'office',
      value: formData.request.office,
    });
    expect(comments).toEqual({
      collapsible: true,
      label: 'comments',
      value: formData.request.comments,
    });
  });

  it('summarizes documentation content correctly', () => {
    const {
      sections: [documentation],
    } = summarizeCleOtherOperationsCreation(formData, ['documentation']);

    expect(documentation.key).toEqual('documentation');
    expect(documentation.title).toEqual('documentationAndPriority');
    expect(documentation.fields).toEqual([
      {
        label: 'documentation',
        value: `T_nFilesAttached--files:${formData.documentation.files.length}`,
      },
      {
        label: 'priority',
        value: `T_${formData.documentation.priority}`,
      },
    ]);
  });
});
