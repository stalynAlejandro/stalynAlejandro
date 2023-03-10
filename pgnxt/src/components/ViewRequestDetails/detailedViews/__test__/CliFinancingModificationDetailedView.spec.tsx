import produce from 'immer';
import userEvent from '@testing-library/user-event';
import fetchMockJest from 'fetch-mock-jest';
import { screen, waitFor, within } from '@testing-library/react';

import ApiUrls from '../../../../constants/apiUrls';
import CliFinancingModificationDetailedView from '../CliFinancingModificationDetailedView';
import { formatDate } from '../../../../utils/dates';
import { formatNumber } from '../../../../utils/formatNumber';
import { renderComponentWithToast } from '../../../../testUtils/renderComponent';
import { get as mockedRequestResponse } from '../../../../testUtils/mocks/data/cli/financingModification/completeInformation';
import * as openNewWindowModule from '../../../../utils/openNewWindow';

describe('Component ViewRequestDetails CliFinancingModificationDetailedView', () => {
  const blobUrl = 'http://test-blob-url';
  const defaultProps = {
    requestDetails: mockedRequestResponse.entity,
  };

  beforeEach(() => {
    fetchMockJest.mockClear();
    fetchMockJest.mock(new RegExp(ApiUrls.documents), 'my data', {
      delay: 0,
      overwriteRoutes: true,
    });
    global.URL.createObjectURL = jest.fn().mockReturnValue(blobUrl);
  });

  const renderWithProps = (props: any = {}) => {
    renderComponentWithToast(
      <CliFinancingModificationDetailedView {...defaultProps} {...props} />,
    );
  };

  it('shows the expected detailed information', async () => {
    renderWithProps();
    const mockedRequest = mockedRequestResponse.entity.request;

    expect(
      await screen.findByText(mockedRequest.request.financingRequest.code),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        mockedRequest.request.financingRequest.contractReference,
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        mockedRequest.request.financingRequest.financingReference,
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        formatDate(
          new Date(mockedRequest.request.financingRequest.expirationDate),
        ),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${formatNumber(mockedRequest.request.financingRequest.amount)} ${
          mockedRequest.request.financingRequest.currency
        }`,
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockedRequest.request.riskLine.iban),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockedRequest.request.office),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockedRequest.documentation.files[0].name),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockedRequest.request.comments),
    ).toBeInTheDocument();
  });

  it('displays no files when data contains no uploaded documents', async () => {
    const newMockedRequestResponse = produce(mockedRequestResponse, (draft) => {
      // eslint-disable-next-line no-param-reassign
      draft.entity.request.documentation.files = [];
    });

    renderWithProps({ requestDetails: newMockedRequestResponse.entity });

    const { findByText } = within(
      screen.getByText('T_attachedDocumentation').closest('div')!,
    );
    expect(await findByText('T_no')).toBeInTheDocument();
  });

  it('displays files in documentation and opens the file in a new window when clicked', async () => {
    jest
      .spyOn(openNewWindowModule, 'openNewWindow')
      .mockImplementation(() => jest.fn());
    renderWithProps();

    const mockedRequestFiles =
      mockedRequestResponse.entity.request.documentation.files;

    await Promise.all(
      mockedRequestFiles.map(async (file) => {
        expect(await screen.findByText(file.name)).toBeInTheDocument();
      }),
    );

    userEvent.click(screen.getByText(mockedRequestFiles[0].name));

    await waitFor(() => {
      expect(
        fetchMockJest
          .lastCall(new RegExp(ApiUrls.documents))?.[0]
          .includes(mockedRequestFiles[0].id),
      ).toBeTruthy();
    });

    await waitFor(() => {
      expect(openNewWindowModule.openNewWindow).toHaveBeenLastCalledWith(blobUrl);
    });
  });
});
