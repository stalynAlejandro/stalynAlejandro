import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import produce from 'immer';
import userEvent from '@testing-library/user-event';
import fetchMockJest from 'fetch-mock-jest';

import * as openNewWindowModule from '../../../../utils/openNewWindow';
import { renderComponentWithToast } from '../../../../testUtils/renderComponent';
import { checkbox, radioButton } from '../../../../testUtils/controls';
import DocumentationWithPriceLetter from '../DocumentationWithPriceLetter';
import { mockFile } from '../../../../testUtils/mockFile';
import ApiUrls from '../../../../constants/apiUrls';

describe('Form Step DocumentationWithPriceLetter', () => {
  const blobUrl = 'http://test-blob-url';
  const entityCode = 'CLE-123';
  const defaultProps = {
    formData: {},
    getPriceChartUrl: jest.fn(),
    onDataChange: jest.fn(),
    onSaveDraft: jest.fn(),
    onSubmitStep: jest.fn(),
    onSummarizeFormData: jest.fn(),
    summarySteps: ['request', 'advance'],
  };

  const renderStep = async (props: any = {}) => {
    await act(() => {
      renderComponentWithToast(
        <DocumentationWithPriceLetter {...defaultProps} {...props} />,
      );
    });
  };

  beforeEach(() => {
    fetchMockJest.mockClear();
    fetchMockJest.mock(ApiUrls.pricesCharts.cle(entityCode), 'my data', {
      delay: 0,
      overwriteRoutes: true,
    });
    global.URL.createObjectURL = jest.fn().mockReturnValue(blobUrl);
    defaultProps.getPriceChartUrl.mockImplementation((code) =>
      ApiUrls.pricesCharts.cle(code),
    );
  });

  describe('First load display data', () => {
    it('renders the component successfully', async () => {
      await renderStep();

      expect(
        screen.getByText('T_attachDocumentationAndPriority'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('T_priceLetter', { selector: 'h3' }),
      ).toBeInTheDocument();
      expect(screen.getByText('T_documentation')).toBeInTheDocument();
      expect(screen.getAllByText('T_searchFile')).toHaveLength(2);
      expect(screen.getAllByText('T_selectFileOrDrag')).toHaveLength(2);
    });

    it('renders the values provided in formData', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.documentation = {
          clientAcceptance: true,
          files: [
            {
              documentType: 'letter',
              id: 'doc-12345',
              name: 'price-letter.pdf',
            },
            {
              id: 'doc-12399',
              name: 'document.pdf',
            },
          ],
          priority: 'urgent',
        };
      });

      await renderStep(newProps);

      const data = newProps.formData.documentation;

      expect(
        checkbox.getDisplayValue(checkbox.getByLabel('T_clientAcceptsPrices')),
      ).toBeTruthy();
      expect(
        screen.getByText(data.files[0].name, {
          selector: '[data-type="letter"] div',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(data.files[1].name, {
          selector: '[data-type="documentation"] div',
        }),
      ).toBeInTheDocument();
      expect(
        radioButton.getDisplayValue(radioButton.getByLabel('T_urgent')),
      ).toBeTruthy();
    });
  });

  describe('Interactions, expected behaviours and method executions', () => {
    it('executes provided onDataChange method when changing a field value', async () => {
      await renderStep();

      await act(() =>
        userEvent.click(
          checkbox.getInteractiveElement(
            checkbox.getByLabel('T_clientAcceptsPrices'),
          ),
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ clientAcceptance: true }),
      );

      const priceLetterFile = mockFile({ name: 'price.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('letter-file-picker').querySelector('input')!,
          priceLetterFile,
        );
      });
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ files: [priceLetterFile] }),
      );

      const documentFile = mockFile({ name: 'document.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          documentFile,
        );
      });
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ files: [priceLetterFile, documentFile] }),
      );

      await act(() =>
        userEvent.click(
          radioButton.getInteractiveElement(radioButton.getByLabel('T_urgent')),
        ),
      );
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ priority: 'urgent' }),
      );
    });

    it('saves draft and opens a new window with the price letter when the price letter button is clicked', async () => {
      jest
        .spyOn(openNewWindowModule, 'openNewWindow')
        .mockImplementation(() => jest.fn());

      defaultProps.onSaveDraft.mockReturnValue({
        entity: {
          code: entityCode,
        },
      });

      await renderStep();

      expect(defaultProps.onSaveDraft).not.toHaveBeenCalled();
      await act(() =>
        userEvent.click(
          screen.getByText('T_priceLetter', { selector: 'button span' }),
        ),
      );
      expect(defaultProps.onSaveDraft).toHaveBeenCalled();

      await waitFor(() => {
        expect(
          fetchMockJest.lastCall(ApiUrls.pricesCharts.cle(entityCode)),
        ).toBeTruthy();
      });

      await waitFor(() => {
        expect(openNewWindowModule.openNewWindow).toHaveBeenLastCalledWith(
          blobUrl,
        );
      });
    });

    it('does not allow to add more than one document in the Price letter section', async () => {
      await renderStep();

      const file1 = mockFile({ name: 'file-1.pdf' });
      const file2 = mockFile({ name: 'file-2.pdf' });

      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('letter-file-picker').querySelector('input')!,
          [file1, file2],
        );
      });

      expect(
        screen.queryByTestId('letter-file-picker'),
      ).not.toBeInTheDocument();

      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ files: [file1] }),
      );
    });

    it('allows to add more than one document in the Documents section', async () => {
      await renderStep();

      const file1 = mockFile({ name: 'file-1.pdf' });
      const file2 = mockFile({ name: 'file-2.pdf' });

      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          [file1, file2],
        );
      });

      expect(screen.queryByTestId('document-file-picker')).toBeInTheDocument();
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          files: [file1, file2],
        }),
      );
    });

    it('keeps documentation if price letter file is added afterwards', async () => {
      await renderStep();

      const file1 = mockFile({ name: 'file-1.pdf' });
      const file2 = mockFile({ name: 'file-2.pdf' });

      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          [file1],
        );
      });

      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('letter-file-picker').querySelector('input')!,
          [file2],
        );
      });

      expect(screen.getByText(file1.name)).toBeInTheDocument();
      expect(screen.getByText(file2.name)).toBeInTheDocument();
    });

    it('deletes a document in the Price letter section when delete button is clicked', async () => {
      await renderStep();

      const file1 = mockFile({ name: 'file-1.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('letter-file-picker').querySelector('input')!,
          file1,
        );
      });

      expect(
        screen.queryByTestId('letter-file-picker'),
      ).not.toBeInTheDocument();

      expect(screen.getByText(file1.name)).toBeInTheDocument();
      await act(() => {
        userEvent.click(screen.getByText('T_delete'));
      });

      expect(screen.queryByText(file1.name)).not.toBeInTheDocument();
      expect(screen.queryByTestId('letter-file-picker')).toBeInTheDocument();
    });

    it('deletes a document in the Documentation section when delete button is clicked', async () => {
      await renderStep();

      const file1 = mockFile({ name: 'file-1.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          file1,
        );
      });

      expect(screen.getByText(file1.name)).toBeInTheDocument();
      await act(() => {
        userEvent.click(screen.getByText('T_delete'));
      });

      expect(screen.queryByText(file1.name)).not.toBeInTheDocument();
      expect(screen.queryByTestId('document-file-picker')).toBeInTheDocument();
    });

    it('executes the provided onSubmitStep method when submitting the form with valid information', async () => {
      await renderStep();

      await act(() =>
        userEvent.click(
          checkbox.getInteractiveElement(
            checkbox.getByLabel('T_clientAcceptsPrices'),
          ),
        ),
      );

      const priceLetterFile = mockFile({ name: 'price.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('letter-file-picker').querySelector('input')!,
          priceLetterFile,
        );
      });

      const documentFile = mockFile({ name: 'document.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          documentFile,
        );
      });

      await act(() =>
        userEvent.click(
          radioButton.getInteractiveElement(radioButton.getByLabel('T_normal')),
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));

      expect(defaultProps.onSubmitStep).toHaveBeenCalled();
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith({
        clientAcceptance: true,
        files: [priceLetterFile, documentFile],
        priority: 'normal',
      });
    });
  });

  describe('Field validation', () => {
    it('displays an error notification when documentation is missing', async () => {
      await renderStep();

      await act(() =>
        userEvent.click(
          checkbox.getInteractiveElement(
            checkbox.getByLabel('T_clientAcceptsPrices'),
          ),
        ),
      );

      const priceLetterFile = mockFile({ name: 'price.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('letter-file-picker').querySelector('input')!,
          priceLetterFile,
        );
      });

      await act(() =>
        userEvent.click(
          radioButton.getInteractiveElement(radioButton.getByLabel('T_normal')),
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));

      expect(
        await screen.findByText(
          'T_acceptanceAndDocumentationNeededDescription',
        ),
      ).toBeInTheDocument();
    });

    it('does not display an error notification when price letter is missing', async () => {
      await renderStep();

      await act(() =>
        userEvent.click(
          checkbox.getInteractiveElement(
            checkbox.getByLabel('T_clientAcceptsPrices'),
          ),
        ),
      );

      const documentFile = mockFile({ name: 'document.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          documentFile,
        );
      });

      await act(() =>
        userEvent.click(
          radioButton.getInteractiveElement(radioButton.getByLabel('T_normal')),
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));

      expect(defaultProps.onSubmitStep).toHaveBeenCalled();
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith({
        clientAcceptance: true,
        files: [documentFile],
        priority: 'normal',
      });
    });

    it('displays an error notification when client acceptance is not checked', async () => {
      await renderStep();

      const priceLetterFile = mockFile({ name: 'price.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('letter-file-picker').querySelector('input')!,
          priceLetterFile,
        );
      });

      const documentFile = mockFile({ name: 'document.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          documentFile,
        );
      });

      await act(() =>
        userEvent.click(
          radioButton.getInteractiveElement(radioButton.getByLabel('T_normal')),
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));

      expect(
        await screen.findByText(
          'T_acceptanceAndDocumentationNeededDescription',
        ),
      ).toBeInTheDocument();
    });

    it('displays an error notification when priority is not set', async () => {
      await renderStep();

      await act(() =>
        userEvent.click(
          checkbox.getInteractiveElement(
            checkbox.getByLabel('T_clientAcceptsPrices'),
          ),
        ),
      );

      const priceLetterFile = mockFile({ name: 'price.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('letter-file-picker').querySelector('input')!,
          priceLetterFile,
        );
      });

      const documentFile = mockFile({ name: 'document.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          documentFile,
        );
      });

      await act(() => userEvent.click(screen.getByText('T_continue')));

      expect(
        await screen.findByText('T_errors.validationError'),
      ).toBeInTheDocument();
    });
  });

  describe('Contextual information and messages', () => {
    it('displays summarized data for previous steps with provided summarySteps', async () => {
      await renderStep();
      expect(defaultProps.onSummarizeFormData).toHaveBeenCalledWith(
        defaultProps.summarySteps,
      );
    });
  });
});
