import { FileProps } from '../../../types/FileProps';

export interface FormDocumentationDto {
  clientAcceptance?: boolean;
  files: FileProps[];
  priority: string;
}
