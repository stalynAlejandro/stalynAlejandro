import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../../testUtils/renderComponent';
import FilePicker from '../FilePicker';

describe('Control FilePicker', () => {
  const defaultProps = {
    buttonLabel: 'My button label',
    label: 'My label',
    onLoad: jest.fn(),
  };

  const testAcceptedFiles = {
    'application/pdf': ['.pdf'],
    'image/jpeg': ['.jpg', '.jpeg'],
  };

  const uploadFilesToInput = async (files: File[] = []) => {
    if (files.length === 0) {
      const blob = new Blob([JSON.stringify(defaultProps)]);
      const file = new File([blob], 'document.pdf', {
        type: 'application/pdf',
      });
      files.push(file);
    }

    defaultProps.onLoad.mockReset();
    const input = screen.getByTestId('file-picker-input');
    act(() => userEvent.upload(input, files));

    await waitFor(() => {
      expect(defaultProps.onLoad).toHaveBeenCalledTimes(1);
    });

    return defaultProps.onLoad.mock.calls[0][0];
  };

  const renderWithProps = (props: any = {}) => {
    renderComponent(<FilePicker {...defaultProps} {...props} />);
  };

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('file-picker')).toBeInTheDocument();
  });

  it('renders the label and the button correctly', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.buttonLabel)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('shows file size limitations if provided', () => {
    const props = { maxFileSizeKb: 10 * 1024 };
    renderWithProps(props);
    expect(
      screen.getByText(
        `T_maximumFileSize ${(props.maxFileSizeKb! / 1024).toFixed()}mb.`,
      ),
    ).toBeInTheDocument();
  });

  it('shows file types limitations if provided', () => {
    const props = {
      accept: testAcceptedFiles,
    };
    renderWithProps(props);
    expect(
      screen.getByText(`T_validFormats: .PDF, .JPG, .JPEG.`),
    ).toBeInTheDocument();
  });

  it('adds uploadedDate prop to uploaded files objects', async () => {
    renderWithProps();

    const uploadedFiles = await uploadFilesToInput();

    expect(uploadedFiles).not.toBeUndefined();
    expect(uploadedFiles[0]).toHaveProperty('uploadedDate');
  });

  it('does not accept files with types not included in the provided accept prop', async () => {
    renderWithProps({ accept: testAcceptedFiles });

    const blob = new Blob([JSON.stringify(defaultProps)]);
    const file = new File([blob], 'document.png', {
      type: 'images/png',
    });

    const uploadedFiles = await uploadFilesToInput([file]);

    expect(uploadedFiles).toHaveLength(0);
  });

  it('file input is triggered when clicking to the button', async () => {
    renderWithProps();
    const container = screen.getByTestId('file-picker');
    const input = screen.getByTestId('file-picker-input');

    const inputClickSpy = jest.spyOn(input, 'click');
    await act(() => userEvent.click(container.querySelector('button')!));
    expect(inputClickSpy).toHaveBeenCalled();
  });

  it('file input is triggered when clicking anywhere in the dropzone', async () => {
    renderWithProps();
    const container = screen.getByTestId('file-picker');
    const input = screen.getByTestId('file-picker-input');

    const inputClickSpy = jest.spyOn(input, 'click');
    await act(() => userEvent.click(container));
    expect(inputClickSpy).toHaveBeenCalled();
  });

  it('adds documentType prop to uploaded file objects', async () => {
    renderWithProps({ documentType: 'letter' });

    const uploadedFiles = await uploadFilesToInput();

    await waitFor(() => expect(uploadedFiles).not.toBeUndefined());
    expect(uploadedFiles?.[0]).toHaveProperty('documentType', 'letter');
  });
});
