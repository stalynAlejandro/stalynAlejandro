import { FileProps } from '../types/FileProps';

interface MockFileProps {
  content?: string;
  documentType?: FileProps['documentType'];
  mimeType?: string;
  name?: string;
}

export const mockFile = (
  {
    content = 'my file content',
    documentType = undefined,
    mimeType = 'plain/text',
    name = 'file.pdf',
  }: MockFileProps = {} as MockFileProps,
) => {
  const contentBlob = new Blob([content], {
    type: mimeType,
  });

  const theFile: FileProps = new File([contentBlob], name, {
    lastModified: new Date().getTime(),
    type: mimeType,
  });

  theFile.uploadedDate = new Date().toJSON();
  if (documentType) {
    theFile.documentType = documentType;
  }

  return theFile;
};
