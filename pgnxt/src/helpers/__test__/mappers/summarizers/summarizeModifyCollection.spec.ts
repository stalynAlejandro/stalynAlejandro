import { summarizeModifyCollection } from '../../../mappers/summarizers/summarizeModifyCollection';
import { formatDate } from '../../../../utils/dates';
import { formData } from '../../../../testUtils/mocks/data/cle/modification/formData';

describe('Helper summarizeModifyCollection', () => {
  it('returns a title with no sections if no formData is provided', () => {
    const summary = summarizeModifyCollection(undefined);
    expect(summary.title).toEqual('T_summaryTitle');
  });

  it('section onEdit method returns null if none is provided', () => {
    const summary = summarizeModifyCollection(formData);

    expect(
      summary.sections.find((s) => s.key === 'request')?.onEdit!(),
    ).toBeNull();
    expect(
      summary.sections.find((s) => s.key === 'documentation')?.onEdit!(),
    ).toBeNull();
  });

  it('section onEdit method is executed with the correct step number', () => {
    const onEdit = jest.fn();
    const summary = summarizeModifyCollection(formData, undefined, onEdit);

    summary.sections.find((s) => s.key === 'request')?.onEdit!();
    summary.sections.find((s) => s.key === 'documentation')?.onEdit!();

    expect(onEdit).toHaveBeenCalledWith(1);
    expect(onEdit).toHaveBeenCalledWith(2);
  });

  it('renders all steps if none is provided', () => {
    const summary = summarizeModifyCollection(formData);

    expect(summary.sections).toHaveLength(3);
    expect(summary.sections[0].key).toEqual('customer');
    expect(summary.sections[1].key).toEqual('request');
    expect(summary.sections[2].key).toEqual('documentation');
  });

  it('renders only specified steps', () => {
    const customerSummary = summarizeModifyCollection(formData, ['customer']);

    expect(customerSummary.sections).toHaveLength(1);
    expect(customerSummary.sections[0].key).toEqual('customer');

    const twoSummaries = summarizeModifyCollection(formData, [
      'request',
      'documentation',
    ]);

    expect(twoSummaries.sections).toHaveLength(2);
    expect(twoSummaries.sections[0].key).toEqual('request');
    expect(twoSummaries.sections[1].key).toEqual('documentation');
  });

  it('generates general properties correctly', () => {
    const { title } = summarizeModifyCollection(formData);
    expect(title).toEqual('T_summaryTitle');
  });

  it('summarizes customer content correctly', () => {
    const {
      sections: [customer],
    } = summarizeModifyCollection(formData, ['customer']);

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
      sections: [requestDetails],
    } = summarizeModifyCollection(formData, ['request']);

    const [collectionRef, collectionAmount, issuanceDate, office, comments] =
      requestDetails.fields;
    expect(requestDetails.title).toEqual('requestDetails');
    expect(requestDetails.key).toEqual('request');
    expect(collectionRef).toEqual({
      label: 'collectionRef',
      value: formData.request.exportCollection.code,
    });
    expect(collectionAmount.label).toEqual('collectionAmount');
    expect(issuanceDate).toEqual({
      label: 'issuanceDate',
      value: formatDate(
        new Date(formData.request.exportCollection.creationDate),
      ),
    });
    expect(office).toEqual({
      label: 'applicantOffice',
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
    } = summarizeModifyCollection(formData, ['documentation']);

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
