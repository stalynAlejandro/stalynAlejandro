import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import produce from 'immer';
import userEvent from '@testing-library/user-event';

import { renderComponentWithToast } from '../../../../testUtils/renderComponent';
import { radioButton } from '../../../../testUtils/controls';
import Documentation from '../Documentation';
import { mockFile } from '../../../../testUtils/mockFile';

describe('Form Step Documentation', () => {
  const defaultProps = {
    formData: {},
    onDataChange: jest.fn(),
    onSaveDraft: jest.fn(),
    onSubmitStep: jest.fn(),
    onSummarizeFormData: jest.fn(),
  };

  const renderStep = async (props: any = {}) => {
    await act(() => {
      renderComponentWithToast(<Documentation {...defaultProps} {...props} />);
    });
  };

  describe('First load display data', () => {
    it('renders the component successfully', async () => {
      await renderStep();

      expect(
        screen.getByText('T_attachDocumentationAndPriority', {
          selector: '.stepTitle__title',
        }),
      ).toBeInTheDocument();
      expect(screen.getByText('T_documentation')).toBeInTheDocument();
      expect(screen.getByText('T_searchFile')).toBeInTheDocument();
      expect(screen.getByText('T_selectFileOrDrag')).toBeInTheDocument();
    });

    it('renders the values provided in formData', async () => {
      const newProps = produce<any>(defaultProps, (immerDraft) => {
        immerDraft.formData.documentation = {
          files: [
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

      expect(screen.getByText(data.files[0].name)).toBeInTheDocument();
      expect(
        radioButton.getDisplayValue(radioButton.getByLabel('T_urgent')),
      ).toBeTruthy();
    });
  });

  describe('Interactions, expected behaviours and method executions', () => {
    it('executes provided onDataChange method when changing a field value', async () => {
      await renderStep();

      const documentFile = mockFile({ name: 'document.pdf' });
      await act(async () => {
        await userEvent.upload(
          screen.getByTestId('document-file-picker').querySelector('input')!,
          documentFile,
        );
      });
      expect(defaultProps.onDataChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ files: [documentFile] }),
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
        files: [documentFile],
        priority: 'normal',
      });
    });
  });

  describe('Field validation', () => {
    it('displays an error notification when documentation is missing', async () => {
      await renderStep();

      await act(() =>
        userEvent.click(
          radioButton.getInteractiveElement(radioButton.getByLabel('T_normal')),
        ),
      );

      await act(() => userEvent.click(screen.getByText('T_continue')));

      expect(
        await screen.findByText('T_documentationNeededDescription'),
      ).toBeInTheDocument();
    });

    it('displays an error notification when priority is not set', async () => {
      await renderStep();

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
    it('displays summarized data for previous steps', async () => {
      await renderStep();
      expect(defaultProps.onSummarizeFormData).toHaveBeenCalledWith([
        'customer',
        'request',
      ]);
    });
  });
});
