import { CustomerCleRequestDto } from '../../CustomerCleRequestDto';
import { CustomerDto } from '../../CustomerDto';
import { FormDocumentationDto } from '../../forms/FormDocumentationDto';

export interface CreateFormDataDto {
  customer: CustomerDto;
  documentation: FormDocumentationDto;
  request: {
    comments: string;
    exportCollection: CustomerCleRequestDto;
    office: string;
  };
  savedStep: number;
}
