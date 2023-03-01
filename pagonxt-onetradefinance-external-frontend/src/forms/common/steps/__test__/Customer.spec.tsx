import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMockJest from 'fetch-mock-jest';
import { act } from 'react-dom/test-utils';

import { renderComponentWithToast } from '../../../../testUtils/renderComponent';
import Customer from '../Customer';
import { StepProps } from '../../types/StepProps';
import { getInputByPlaceholder } from '../../../../testUtils/getInputByPlaceholder';
import theme from '../../../../resources/theme';
import { changeInputValue } from '../../../../testUtils/changeInputValue';
import { get as customerMockedResponse } from '../../../../testUtils/mocks/data/customers';
import ApiUrls from '../../../../constants/apiUrls';

describe('Form Step Customer', () => {
  const defaultProps: StepProps = {
    formData: {},
    initialData: {},
    onDataChange: jest.fn(),
    onSaveDraft: jest.fn(),
    onStepChange: jest.fn(),
    onSubmitStep: jest.fn(),
    onSummarizeFormData: jest.fn(),
    onUpdateFormData: jest.fn(),
  };

  const renderWithProps = (props: any = {}) => {
    renderComponentWithToast(<Customer {...defaultProps} {...props} />);
  };

  let mocked: any;

  const mockCustomerFetch = (
    mockedResponse: any = customerMockedResponse,
    config: any = {},
  ) =>
    fetchMockJest.mock(
      new RegExp(ApiUrls.clients),
      { body: mockedResponse, status: 200, ...config },
      {
        delay: 500,
        overwriteRoutes: true,
      },
    );

  const getMockedUrl = (relativePath: string) =>
    new URL(`http://base.com/${relativePath}`);

  const performSearch = async (waitForResponse: boolean = true) => {
    await act(() =>
      changeInputValue(
        getInputByPlaceholder('T_clientName')!.querySelector('input')!,
        'Coca',
      ),
    );

    if (waitForResponse) {
      await act(() => userEvent.click(screen.getByText('T_search')));

      await waitFor(async () => {
        expect(
          screen.queryByTestId('loader-container'),
        ).not.toBeInTheDocument();
      });
    } else {
      userEvent.click(screen.getByText('T_search'));
    }
  };

  beforeEach(() => {
    mocked = mockCustomerFetch();
    jest.clearAllMocks();
  });

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByText('T_selectAClient')).toBeInTheDocument();
  });

  it('displays Name input with no error when it is first loaded and it has not been validated', () => {
    renderWithProps();
    const inputClient = getInputByPlaceholder('T_clientName');

    expect(inputClient).toBeInTheDocument();
    expect(inputClient).not.toHaveStyle({
      borderBottomColor: theme.colors.boston,
    });
  });

  it('displays Name input with error when it is empty and it has been validated', async () => {
    renderWithProps();
    const inputClient = getInputByPlaceholder('T_clientName');

    expect(inputClient).toBeInTheDocument();
    await act(() => userEvent.click(screen.getByText('T_search')));
    expect(inputClient).toHaveStyle({ borderBottomColor: theme.colors.boston });
  });

  it('clears the search form when Clear button is clicked', async () => {
    renderWithProps();

    const inputClient = getInputByPlaceholder('T_clientName');
    await act(() =>
      changeInputValue(inputClient!.querySelector('input')!, 'Client name'),
    );
    expect(screen.getByDisplayValue('Client name')).toBeInTheDocument();

    await act(() => userEvent.click(screen.getByText('T_clean')));
    expect(screen.queryByDisplayValue('Client name')).not.toBeInTheDocument();
  });

  it('does not perform a search if customer name is not fulfilled', async () => {
    renderWithProps();

    await act(() => userEvent.click(screen.getByText('T_search')));
    expect(fetchMockJest).not.toHaveFetched();
  });

  it('searches for customers with correct values from the input fields', async () => {
    renderWithProps();

    await act(() =>
      changeInputValue(
        getInputByPlaceholder('T_clientName')!.querySelector('input')!,
        'Coca',
      ),
    );
    await act(() =>
      changeInputValue(
        getInputByPlaceholder('T_taxId T_fieldOptional')!.querySelector(
          'input',
        )!,
        'TAXID',
      ),
    );
    await act(() =>
      changeInputValue(
        getInputByPlaceholder('T_personNumber T_fieldOptional')!.querySelector(
          'input',
        )!,
        'PERSON',
      ),
    );
    await act(() =>
      changeInputValue(
        getInputByPlaceholder('T_office T_fieldOptional')!.querySelector(
          'input',
        )!,
        '1234',
      ),
    );

    await act(() => userEvent.click(screen.getByText('T_search')));
    await waitFor(async () => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });

    expect(fetchMockJest).toHaveFetched();

    const urlParams = getMockedUrl(mocked.calls()[0][0]).searchParams;
    expect(urlParams.get('name')).toEqual('Coca');
    expect(urlParams.get('tax_id')).toEqual('TAXID');
    expect(urlParams.get('person_number')).toEqual('PERSON');
    expect(urlParams.get('office')).toEqual('1234');
  });

  it('shows loader when performing the search fetch', async () => {
    renderWithProps();

    performSearch(false);
    await waitFor(() =>
      expect(screen.getByTestId('loader-container')).toBeInTheDocument(),
    );
  });

  it('displays an error with the provided error key when the search fetch call fails', async () => {
    fetchMockJest.mockClear();
    mockCustomerFetch(
      {
        errors: [{ code: 'errorIntegration' }],
      },
      { status: 500 },
    );

    renderWithProps();
    await performSearch();

    await waitFor(async () => {
      expect(
        await screen.findByText(`T_errors.customer.errorIntegration`),
      ).toBeInTheDocument();
    });
  });

  it('displays a generic error if no error key provided when the search fetch call fails', async () => {
    fetchMockJest.mockClear();
    mockCustomerFetch(
      {
        another: 'typeofobject',
      },
      { status: 500 },
    );

    renderWithProps();
    await performSearch();

    await waitFor(async () => {
      expect(await screen.findByText(`T_errorOcurred`)).toBeInTheDocument();
    });
  });

  it('renders the customers received in the table', async () => {
    renderWithProps();
    await performSearch();

    expect(
      screen.getByText(customerMockedResponse[0].name, { selector: 'td' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(customerMockedResponse[1].name, { selector: 'td' }),
    ).toBeInTheDocument();
  });

  it('the Continue button appears only when a customer is selected', async () => {
    renderWithProps();
    await performSearch();

    expect(screen.queryByText('T_continue')).not.toBeInTheDocument();
    await act(() => userEvent.click(screen.getAllByTestId('radio-button')[0]));
    expect(await screen.findByText('T_continue')).toBeInTheDocument();
  });

  it('calls the provided onDataChange method when customer is selected', async () => {
    renderWithProps();
    await performSearch();

    expect(screen.queryByText('T_continue')).not.toBeInTheDocument();
    await act(() => userEvent.click(screen.getAllByTestId('radio-button')[0]));

    expect(defaultProps.onDataChange).toHaveBeenCalledWith(
      customerMockedResponse[0],
    );
  });

  it('calls the provided onSubmitStep method when Continue button is pressed', async () => {
    renderWithProps();
    await performSearch();

    expect(screen.queryByText('T_continue')).not.toBeInTheDocument();
    await act(() => userEvent.click(screen.getAllByTestId('radio-button')[0]));

    await act(async () =>
      userEvent.click(await screen.findByText('T_continue')),
    );
    expect(defaultProps.onSubmitStep).toHaveBeenCalled();
  });

  it('does not allow to write more characters than the permitted', async () => {
    const fieldLimits = {
      name: 50,
      office: 10,
      personNumber: 50,
      taxId: 50,
    };

    const exceededValues = {
      long: 'jdoaijsodi jaosidja oisdjoaisjodiajsodijasda sdj asdkpa oskdpao',
      short: '1234567890123456',
    };

    renderWithProps();

    const inputs = {
      clientName: getInputByPlaceholder('T_clientName')!.querySelector('input'),
      office: getInputByPlaceholder('T_office T_fieldOptional')!.querySelector(
        'input',
      ),
      personNumber: getInputByPlaceholder(
        'T_personNumber T_fieldOptional',
      )!.querySelector('input'),
      taxId: getInputByPlaceholder('T_taxId T_fieldOptional')!.querySelector(
        'input',
      ),
    };

    await act(async () => {
      await userEvent.paste(inputs.clientName!, exceededValues.long);
    });
    await act(async () => {
      await userEvent.paste(inputs.taxId!, exceededValues.long);
    });
    await act(async () => {
      await userEvent.paste(inputs.personNumber!, exceededValues.long);
    });
    await act(async () => {
      await userEvent.paste(inputs.office!, exceededValues.short);
    });

    expect(inputs.clientName).toHaveDisplayValue(
      exceededValues.long.substring(0, fieldLimits.name),
    );
    expect(inputs.taxId).toHaveDisplayValue(
      exceededValues.long.substring(0, fieldLimits.taxId),
    );
    expect(inputs.personNumber).toHaveDisplayValue(
      exceededValues.long.substring(0, fieldLimits.personNumber),
    );
    expect(inputs.office).toHaveDisplayValue(
      exceededValues.short.substring(0, fieldLimits.office),
    );
  });
});
