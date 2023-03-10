import { FileProps } from '../types/FileProps';
import { fileToBase64 } from '../utils/fileToBase64';

export const mapFileItem = async (
  fileItem: FileProps,
  skipDataIfId: boolean = true,
): Promise<FileProps> => ({
  ...fileItem,
  data: skipDataIfId && fileItem.id ? undefined : await fileToBase64(fileItem),
  name: fileItem.name, // Overwrite it to make it serializable
});
