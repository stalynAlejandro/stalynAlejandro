import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import {
  StFilePickerContainer,
  StFilePickerInput,
  StUploadIcon,
  StSubtextLabel,
  StTextLabel,
  StButton,
} from './FilePickerStyled';
import { FileProps } from '../../../types/FileProps';

interface FilePickerProps {
  accept?: {
    [mimetype: string]: string[];
  };
  buttonLabel: string;
  className?: string;
  'data-testid'?: string;
  documentType?: FileProps['documentType'];
  label: string;
  maxFileSizeKb?: number;
  multiple?: boolean;
  onLoad: (files: FileProps[]) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({
  accept,
  buttonLabel,
  className,
  'data-testid': testId,
  documentType,
  label,
  maxFileSizeKb,
  multiple,
  onLoad,
}) => {
  const { t } = useTranslation();
  const { acceptedFiles, getInputProps, getRootProps } = useDropzone({
    accept,
    multiple,
  });
  const toUpper = (str: string) => str.toUpperCase();

  const validExtensions = ([] as string[]).concat(...Object.values(accept!));

  useEffect(() => {
    const files =
      acceptedFiles?.filter((file: FileProps) => {
        const extension = file?.name?.split('.').at(-1);
        return (
          validExtensions!.length === 0 ||
          (extension &&
            validExtensions?.map(toUpper).includes(toUpper(`.${extension}`)))
        );
      }) || [];

    files.forEach((f: FileProps) => {
      /* eslint-disable no-param-reassign */
      if (!f.uploadedDate) {
        f.uploadedDate = new Date().toJSON();
      }
      if (documentType) {
        f.documentType = documentType;
      }
      /* eslint-enable no-param-reassign */
    });

    onLoad(files);
  }, [acceptedFiles]);

  return (
    <StFilePickerContainer
      className={cx('form-file-picker', className)}
      data-testid={testId || 'file-picker'}
      {...getRootProps()}
    >
      <StFilePickerInput data-testid="file-picker-input" {...getInputProps()} />
      <StUploadIcon icon="upload" size={48} />
      <StTextLabel>{label}</StTextLabel>
      <StSubtextLabel>
        {Object.values(accept!).length > 0 &&
          `${t('validFormats')}: ${Object.values(validExtensions!)
            .map(toUpper)
            .join(', ')}. `}
        {maxFileSizeKb! > 0 &&
          `${t('maximumFileSize')} ${(maxFileSizeKb! / 1024).toFixed()}mb.`}
      </StSubtextLabel>
      <StButton inverse label={buttonLabel} wide onClick={() => null} />
    </StFilePickerContainer>
  );
};

FilePicker.defaultProps = {
  accept: {},
  className: '',
  'data-testid': '',
  documentType: null,
  maxFileSizeKb: 0,
  multiple: false,
};

export default FilePicker;
