import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../../../testUtils/renderComponent';
import Confirm from '../Confirm';

describe('Form Step CLE REQUEST CreateForm Confirm', () => {
  const mockedOnEdit = jest.fn();
  const defaultProps = {
    formData: {
      customer: {
        name: 'Client',
        personNumber: 'BUC-123456',
        taxId: 'CID2334',
      },
    },
    onSummarizeFormData: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onSummarizeFormData.mockReturnValue({
      sections: [
        {
          fields: [
            {
              label: 'client',
              value: 'Old client',
            },
          ],
          key: 'customer',
        },
        {
          fields: [
            {
              label: 'clientAcceptance',
              value: 'yes',
            },
            {
              label: 'priority',
              value: 'normal',
            },
          ],
          key: 'documentation',
          onEdit: () => mockedOnEdit(),
          title: 'documentationAndPriority',
        },
      ],
      title: 'summary',
    });
  });

  const renderStep = async (props: any = {}) => {
    await act(() => {
      renderComponent(<Confirm {...defaultProps} {...props} />);
    });
  };

  describe('First load display data', () => {
    it('renders the component successfully', async () => {
      await renderStep();
      expect(screen.getByText('T_pleaseVerifyData')).toBeInTheDocument();
    });

    it('renders the values provided in onSummarizeFormData with custom customer section and no title', async () => {
      await renderStep();

      expect(screen.queryByText('Old client')).not.toBeInTheDocument();
      expect(
        screen.queryByText(defaultProps.formData.customer.name),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(defaultProps.formData.customer.taxId),
      ).toBeInTheDocument();
      expect(screen.queryByText('yes')).toBeInTheDocument();
      expect(screen.queryByText('normal')).toBeInTheDocument();
      expect(screen.queryByText('summary')).not.toBeInTheDocument();
    });
  });

  describe('Interactions, expected behaviours and method executions', () => {
    it('pressing the Edit button on a step calls the provided onEdit method with the right step number', async () => {
      await renderStep();

      await act(() => userEvent.click(screen.getByText('T_edit')));
      expect(mockedOnEdit).toHaveBeenLastCalledWith();
    });
  });

  describe('Contextual information and messages', () => {
    it('displays summarized data for all steps', async () => {
      await renderStep();
      expect(defaultProps.onSummarizeFormData).toHaveBeenLastCalledWith();
    });
  });
});
