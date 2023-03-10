import React from 'react';
import { useTranslation } from 'react-i18next';

import { FileProps } from '../../types/FileProps';
import { formatDate } from '../../utils/dates';
import { ActionItem } from '../ActionItem';
import { TextButton } from '../TextButton';

interface FileActionItemProps {
  file: FileProps;
  onDelete: (fileName: string) => void;
  type?: string;
}

const FileActionItem: React.FC<FileActionItemProps> = ({
  file: { name, uploadedDate },
  onDelete,
  type,
}) => {
  const { t } = useTranslation();

  return (
    <ActionItem
      description={
        uploadedDate
          ? t('uploadedOnN', {
              date: formatDate(new Date(uploadedDate), true),
            })
          : ''
      }
      name={name}
      type={type}
    >
      <TextButton
        icon="trash"
        label={t('delete')}
        onClick={() => onDelete(name)}
      />
    </ActionItem>
  );
};

FileActionItem.defaultProps = {
  type: '',
};

export default FileActionItem;
