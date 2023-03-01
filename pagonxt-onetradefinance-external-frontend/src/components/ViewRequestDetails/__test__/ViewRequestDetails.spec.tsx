import React from 'react';
import fetchMock from 'fetch-mock-jest';
import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import produce from 'immer';

import { renderComponentWithToast } from '../../../testUtils/renderComponent';
import ViewRequestDetails from '../ViewRequestDetails';
import { formatDate } from '../../../utils/dates';
import ApiUrls from '../../../constants/apiUrls';
import productTypes, { ProductTypes } from '../../../enums/productTypes';
import eventTypes, { EventTypes } from '../../../enums/eventTypes';
import { get as mockedRequestResponse } from '../../../testUtils/mocks/data/cle/request/completeInformation';
import { get as commentsMockedResponse } from '../../../testUtils/mocks/data/requestComments';
import { get as historicMockedResponse } from '../../../testUtils/mocks/data/requestHistoric';
import { get as mockedCliRequestResponse } from '../../../testUtils/mocks/data/cli/request/completeInformation';
import { getOperationApiUrl } from '../../../utils/getOperationApiUrl';
import { getOperationFormUrl } from '../../../utils/getOperationFormUrl';

describe('Component ViewRequestDetails', () => {
  const defaultProps = {
    event: eventTypes.REQUEST,
    onClose: jest.fn(),
    product: productTypes.CLE,
    requestId: 'CLE-44',
  };
  const defaultCliProps = {
    event: eventTypes.REQUEST,
    onClose: jest.fn(),
    product: productTypes.CLI,
    requestId: 'CLI-44',
  };

  const getDetailsUrl = ApiUrls.cle.request.completeInformation.get(
    defaultProps.requestId,
  );
  const getRequestDetailsUrl = ApiUrls.cle.request.details(
    defaultProps.requestId,
  );
  const cancelUrl = ApiUrls.cle.request.completeInformation.cancel(
    defaultProps.requestId,
  );
  const getCliRequestDetailsUrl = ApiUrls.cli.request.details(
    defaultCliProps.requestId,
  );
  const getCliDetailsUrl = ApiUrls.cli.request.completeInformation.get(
    defaultCliProps.requestId,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.mockClear();

    fetchMock.mock(getDetailsUrl, JSON.stringify(mockedRequestResponse), {
      overwriteRoutes: true,
    });

    fetchMock.mock(
      getRequestDetailsUrl,
      JSON.stringify(mockedRequestResponse),
      {
        overwriteRoutes: true,
      },
    );

    fetchMock.mock(
      cancelUrl,
      JSON.stringify({ entity: defaultProps.requestId }),
      {
        delay: 200,
        overwriteRoutes: true,
      },
    );

    fetchMock.mock(
      getCliRequestDetailsUrl,
      JSON.stringify(mockedCliRequestResponse),
      {
        overwriteRoutes: true,
      },
    );

    fetchMock.mock(getCliDetailsUrl, JSON.stringify(mockedCliRequestResponse), {
      overwriteRoutes: true,
    });
  });

  const renderWithProps = (props: any = {}) => {
    renderComponentWithToast(
      <BrowserRouter>
        <ViewRequestDetails {...defaultProps} {...props} />
      </BrowserRouter>,
    );
  };

  const waitForRenderWithProps = async (props: any = {}) => {
    renderWithProps(props);
    expect(
      await screen.findByText(`T_requestRef ${defaultProps.requestId}`),
    ).toBeInTheDocument();
  };

  describe('Common behaviour', () => {
    it('renders the component successfully', async () => {
      renderWithProps();
      expect(
        await screen.findByText(`T_requestRef ${defaultProps.requestId}`),
      ).toBeInTheDocument();
      expect(screen.getByTestId('view-request-details')).toBeInTheDocument();
    });

    it('shows a Loader until the data is fetched', async () => {
      fetchMock.mockReset();
      fetchMock.once(
        new RegExp(defaultProps.requestId),
        JSON.stringify(mockedRequestResponse),
        { delay: 500, overwriteRoutes: true },
      );

      renderWithProps();
      expect(await screen.findByTestId('loader-container')).toBeInTheDocument();
      await waitFor(() =>
        expect(
          screen.queryByTestId('loader-container'),
        ).not.toBeInTheDocument(),
      );
    });

    it('renders the title with the contextual buttons', async () => {
      await waitForRenderWithProps();

      expect(screen.getByText('T_comments')).toBeInTheDocument();
      expect(screen.getByText('T_historic')).toBeInTheDocument();
    });

    it('render the title with CLI props the contextual buttons', async () => {
      await act(() => {
        renderWithProps(defaultCliProps);
      });

      expect(screen.getByText('T_comments')).toBeInTheDocument();
      expect(screen.getByText('T_historic')).toBeInTheDocument();
    });

    it.skip('calls the provided onClose method when clicking the back button in the title', async () => {
      await waitForRenderWithProps();

      userEvent.click(screen.getByTestId('icon-chevron-left-bold'));
      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('displays basic information on load', async () => {
      await waitForRenderWithProps();
      const mockedRequest = mockedRequestResponse.entity.request;

      expect(screen.getByText(mockedRequest.customer.name)).toBeInTheDocument();
      expect(
        screen.getByText(
          `T_${mockedRequest.documentation.priority}, ${formatDate(
            new Date(mockedRequest.slaEnd),
            true,
          )}`,
        ),
      ).toBeInTheDocument();
    });

    it('displays a warning notification if warnings are received from service when fetching data', async () => {
      fetchMock.mockReset();
      fetchMock.once(
        new RegExp(defaultProps.requestId),
        JSON.stringify({
          ...mockedRequestResponse,
          key: 'taskWasRecentlyEdited',
          type: 'warning',
        }),
        { delay: 100, overwriteRoutes: true },
      );

      await waitForRenderWithProps();

      await waitFor(() => {
        expect(
          screen.getByText(
            'T_warnings.completeInformation.taskWasRecentlyEdited',
          ),
        ).toBeInTheDocument();
      });
    });

    it('hides buttons when type is "request"', async () => {
      await waitForRenderWithProps({ type: 'request' });

      expect(
        screen.queryByText('T_completeInformation'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('T_requestCancellation'),
      ).not.toBeInTheDocument();
    });

    it('displays a different status timeline when type is "request" and displayedStatus comes in the response', async () => {
      fetchMock.mockReset();
      const mockedWithDisplayedStatus = produce(
        mockedRequestResponse,
        (draft) => {
          // eslint-disable-next-line no-param-reassign
          draft.entity.request.displayedStatus = 'IN_PROGRESS';
        },
      );
      fetchMock.once(
        new RegExp(defaultProps.requestId),
        JSON.stringify(mockedWithDisplayedStatus),
        { delay: 100, overwriteRoutes: true },
      );

      await waitForRenderWithProps({ type: 'request' });

      expect(screen.queryByText('T_requestStatus')).toBeInTheDocument();
      expect(screen.queryByText('T_statuses.in_progress')).toBeInTheDocument();
      expect(screen.queryByText('T_instructions')).not.toBeInTheDocument();
      expect(screen.queryByText('T_requestCreatedBy')).not.toBeInTheDocument();
    });

    it('displays no status timeline when type is "request" and displayedStatus is empty in the response', async () => {
      fetchMock.mockReset();
      const mockedWithDisplayedStatus = produce(
        mockedRequestResponse,
        (draft) => {
          // eslint-disable-next-line no-param-reassign
          draft.entity.request.displayedStatus = '';
        },
      );
      fetchMock.once(
        new RegExp(defaultProps.requestId),
        JSON.stringify(mockedWithDisplayedStatus),
        { delay: 100, overwriteRoutes: true },
      );

      await waitForRenderWithProps({ type: 'request' });

      expect(screen.queryByText('T_requestStatus')).not.toBeInTheDocument();
      expect(
        screen.queryByText('T_statuses.in_progress'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('T_instructions')).not.toBeInTheDocument();
      expect(screen.queryByText('T_requestCreatedBy')).not.toBeInTheDocument();
    });
  });

  describe('Detailed information', () => {
    it('shows detailed information when clicking on "See details" button', async () => {
      await waitForRenderWithProps();

      // defaultProps is CLE - Request, so we check it
      act(() => userEvent.click(screen.getByText('T_seeDetails')));
      expect(
        screen.getByTestId('cle-request-detailed-view'),
      ).toBeInTheDocument();
    });

    it('hides the detailed information when clicking on "Hide details" button', async () => {
      await waitForRenderWithProps();

      act(() => userEvent.click(screen.getByText('T_seeDetails')));
      expect(
        screen.getByTestId('cle-request-detailed-view'),
      ).toBeInTheDocument();

      act(() => userEvent.click(screen.getByText('T_hideDetails')));
      await waitFor(() =>
        expect(
          screen.queryByTestId('cle-request-detailed-view'),
        ).not.toBeInTheDocument(),
      );
    });
  });

  describe('Status timeline', () => {
    it('renders the expected status elements', async () => {
      await waitForRenderWithProps();

      expect(screen.getByText('T_creation')).toBeInTheDocument();
      expect(screen.getByText('T_statuses.in_progress')).toBeInTheDocument();
      expect(screen.getByText('T_instructions')).toBeInTheDocument();
      expect(screen.getByText('T_issuance')).toBeInTheDocument();
    });

    it('shows the author and date of the first Creation status', async () => {
      await waitForRenderWithProps();
      const mockedData = mockedRequestResponse.entity;

      expect(screen.getByText('T_requestCreatedBy')).toBeInTheDocument();
      expect(
        screen.getByText(
          formatDate(new Date(mockedData.requestCreationTime), true),
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockedData.requestCreatorName),
      ).toBeInTheDocument();
    });

    it('shows a notification card with the received warning information in the fetched data', async () => {
      await waitForRenderWithProps();

      expect(
        screen.getByText(
          `T_returnReasons.${mockedRequestResponse.entity.returnReason}`,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockedRequestResponse.entity.returnComment),
      ).toBeInTheDocument();
    });
  });

  describe('Request cancellation flow', () => {
    it('shows a warning message when "Request cancellation" button is clicked', async () => {
      await waitForRenderWithProps();

      act(() => userEvent.click(screen.getByText('T_requestCancellation')));
      expect(
        await screen.findByText('T_requestCancellationPromptMessage'),
      ).toBeInTheDocument();
    });

    it('hides the warning message when "Close" button is clicked in the modal dialog', async () => {
      await waitForRenderWithProps();

      act(() => userEvent.click(screen.getByText('T_requestCancellation')));

      const closeButton = await screen.findByText('T_close');
      expect(closeButton).toBeInTheDocument();
      act(() => userEvent.click(closeButton));

      expect(
        screen.queryByText('T_requestCancellationPromptMessage'),
      ).not.toBeInTheDocument();
    });

    it('performs the fetch operation to cancel the request and shows loader', async () => {
      await waitForRenderWithProps();

      act(() => userEvent.click(screen.getByText('T_requestCancellation')));
      expect(
        await screen.findByText('T_requestCancellationPromptMessage'),
      ).toBeInTheDocument();

      act(() => userEvent.click(screen.getByText('T_confirm')));
      expect(screen.getByTestId('loader-container')).toBeInTheDocument();
    });

    it('calls provided onClose method and shows success notification if cancel operation is successfull', async () => {
      await waitForRenderWithProps();

      act(() => userEvent.click(screen.getByText('T_requestCancellation')));
      expect(
        await screen.findByText('T_requestCancellationPromptMessage'),
      ).toBeInTheDocument();

      act(() => userEvent.click(screen.getByText('T_confirm')));

      await waitFor(() => {
        expect(fetchMock).toHaveFetched(cancelUrl);
      });
      await waitFor(() => {
        expect(defaultProps.onClose).toHaveBeenCalled();
      });
      await waitFor(async () => {
        expect(
          await screen.findByText(`T_requestCancelledSuccessfully`),
        ).toBeInTheDocument();
      });
    });

    it('performs the fetch operation to cancel the request and shows an error if failed', async () => {
      await waitForRenderWithProps();

      act(() => userEvent.click(screen.getByText('T_requestCancellation')));
      expect(
        await screen.findByText('T_requestCancellationPromptMessage'),
      ).toBeInTheDocument();

      fetchMock.mockReset();
      fetchMock.once(cancelUrl, 500, {
        overwriteRoutes: true,
      });

      act(() => userEvent.click(screen.getByText('T_confirm')));

      await waitFor(() => {
        expect(fetchMock).toHaveFetched(cancelUrl);
      });

      await waitFor(async () => {
        expect(
          screen.queryByTestId('loader-container'),
        ).not.toBeInTheDocument();
        expect(await screen.findByText(`T_errorOcurred`)).toBeInTheDocument();
      });
    });
  });

  describe('Comments modal', () => {
    beforeEach(() => {
      fetchMock.mock(
        ApiUrls.requestComments(defaultProps.requestId, 'es_es'),
        commentsMockedResponse,
      );
    });

    it('displays the comments modal when Comments button is clicked', async () => {
      await waitForRenderWithProps();
      act(() => userEvent.click(screen.getByText('T_comments')));

      await waitFor(() => {
        expect(screen.getByTestId('comments-modal')).toBeInTheDocument();
      });

      const { getByTestId } = within(screen.getByTestId('comments-modal'));

      await waitFor(() => {
        expect(getByTestId('comments-list')).toBeInTheDocument();
      });
    });
  });

  describe('Historic modal', () => {
    beforeEach(() => {
      fetchMock.mock(
        ApiUrls.requestHistoric(defaultProps.requestId, 'es_es'),
        historicMockedResponse,
      );
    });

    it('displays the historic modal when Historic button is clicked', async () => {
      await waitForRenderWithProps();
      act(() => userEvent.click(screen.getByText('T_historic')));

      await waitFor(() => {
        expect(screen.getByTestId('historic-modal')).toBeInTheDocument();
      });

      const { getByTestId } = within(screen.getByTestId('historic-modal'));

      await waitFor(() => {
        expect(getByTestId('table-container')).toBeInTheDocument();
      });
    });
  });

  describe('Specific flows by product and event', () => {
    const productsAndEvents: {
      [key: string]: { [key: string]: { detailsId: string } };
    } = {
      [productTypes.CLE]: {
        [eventTypes.REQUEST]: { detailsId: 'cle-request-detailed-view' },
        [eventTypes.MODIFICATION]: {
          detailsId: 'cle-modification-detailed-view',
        },
        [eventTypes.ADVANCE]: { detailsId: 'cle-advance-detailed-view' },
        [eventTypes.ADVANCE_MODIFICATION]: {
          detailsId: 'cle-advance-modification-detailed-view',
        },
        [eventTypes.ADVANCE_CANCELLATION]: {
          detailsId: 'cle-advance-cancellation-detailed-view',
        },
        [eventTypes.OTHER_OPERATIONS]: {
          detailsId: 'cle-other-operations-detailed-view',
        },
      },
      [productTypes.CLI]: {
        [eventTypes.REQUEST]: { detailsId: 'cli-request-detailed-view' },
        [eventTypes.MODIFICATION]: {
          detailsId: 'cli-modification-detailed-view',
        },
        [eventTypes.PAYMENT_ACCOUNTLESS]: {
          detailsId: 'cli-payment-accountless-detailed-view',
        },
        [eventTypes.PAYMENT_CHARGE]: {
          detailsId: 'cli-payment-charge-detailed-view',
        },
        [eventTypes.PAYMENT_FINANCING]: {
          detailsId: 'cli-payment-financing-detailed-view',
        },
        [eventTypes.FINANCING_REQUEST]: {
          detailsId: 'cli-financing-request-detailed-view',
        },
        [eventTypes.FINANCING_MODIFICATION]: {
          detailsId: 'cli-financing-modification-detailed-view',
        },
        [eventTypes.FINANCING_CANCELLATION]: {
          detailsId: 'cli-financing-cancellation-detailed-view',
        },
        [eventTypes.OTHER_OPERATIONS]: {
          detailsId: 'cli-other-operations-detailed-view',
        },
      },
    };

    Object.keys(productsAndEvents).forEach((product) => {
      describe(`Product ${product}`, () => {
        Object.keys(productsAndEvents[product]).forEach((event) => {
          describe(`Event ${event}`, () => {
            const flowTaskDetailsUrl = getOperationApiUrl(
              product as ProductTypes,
              event as EventTypes,
              'completeInformation',
            ).get(defaultProps.requestId);

            const flowRequestDetailsUrl = getOperationApiUrl(
              product as ProductTypes,
              event as EventTypes,
              'details',
            )(defaultProps.requestId);

            const flowCancelUrl = getOperationApiUrl(
              product as ProductTypes,
              event as EventTypes,
              'completeInformation',
            )?.cancel(defaultProps.requestId);

            const flowWaitForRenderWithProps = async (props: any = {}) => {
              await waitForRenderWithProps({
                event,
                product,
                ...props,
              });
            };

            beforeEach(() => {
              fetchMock.mock(
                flowTaskDetailsUrl,
                JSON.stringify(mockedRequestResponse),
                {
                  overwriteRoutes: true,
                },
              );

              fetchMock.mock(
                flowRequestDetailsUrl,
                JSON.stringify(mockedRequestResponse),
                {
                  overwriteRoutes: true,
                },
              );

              fetchMock.mock(
                flowCancelUrl,
                JSON.stringify({ entity: defaultProps.requestId }),
                {
                  delay: 200,
                  overwriteRoutes: true,
                },
              );
            });

            describe('Detailed information', () => {
              it('fetches the right URL to get the detailed information when it is a request', async () => {
                await flowWaitForRenderWithProps({ type: 'request' });
                await waitFor(() => {
                  expect(fetchMock).toHaveFetched(flowRequestDetailsUrl);
                });
              });

              it('fetches the right URL to get the detailed information when it is a task', async () => {
                await flowWaitForRenderWithProps();
                await waitFor(() => {
                  expect(fetchMock).toHaveFetched(flowTaskDetailsUrl);
                });
              });

              it('shows the right information component for its detailed information', async () => {
                await flowWaitForRenderWithProps();

                act(() => userEvent.click(screen.getByText('T_seeDetails')));
                expect(
                  screen.getByTestId(
                    productsAndEvents[product][event].detailsId,
                  ),
                ).toBeInTheDocument();
              });
            });

            describe('Cancel flow', () => {
              it('fetches the right URL when Cancel flow is initiated', async () => {
                await flowWaitForRenderWithProps();

                act(() =>
                  userEvent.click(screen.getByText('T_requestCancellation')),
                );
                expect(
                  await screen.findByText('T_requestCancellationPromptMessage'),
                ).toBeInTheDocument();

                act(() => userEvent.click(screen.getByText('T_confirm')));

                await waitFor(() => {
                  expect(fetchMock).toHaveFetched(flowCancelUrl);
                });
              });
            });

            describe('Complete information flow', () => {
              it('navigates to the right complete information form when "Complete information" button is clicked', async () => {
                await flowWaitForRenderWithProps();
                const completeInformationUrl = `${getOperationFormUrl(
                  product as ProductTypes,
                  event as EventTypes,
                  'completeInformation',
                )}/${defaultProps.requestId}`;

                expect(
                  window.location.href.includes(completeInformationUrl),
                ).toBeFalsy();

                act(() =>
                  userEvent.click(
                    screen.getByText('T_completeInformation', {
                      selector: 'button',
                    }),
                  ),
                );

                expect(
                  window.location.href.includes(completeInformationUrl),
                ).toBeTruthy();
              });
            });
          });
        });
      });
    });
  });
});
