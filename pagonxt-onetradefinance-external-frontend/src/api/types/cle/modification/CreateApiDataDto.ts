import { CustomerCleRequestDto } from '../../CustomerCleRequestDto';
import { CustomerDto } from '../../CustomerDto';
import { FormDocumentationDto } from '../../forms/FormDocumentationDto';

export interface CreateApiDataDto {
  code?: string | null;
  comments?: string;
  customer: CustomerDto;
  documentation: FormDocumentationDto;
  exportCollection: CustomerCleRequestDto;
  office?: string;
}
