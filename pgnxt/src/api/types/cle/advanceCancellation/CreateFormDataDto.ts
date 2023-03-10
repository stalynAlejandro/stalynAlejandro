import { CustomerDto } from '../../CustomerDto';
import { FormDocumentationDto } from '../../forms/FormDocumentationDto';
import { CustomerCleAdvanceDto } from '../../CustomerCleAdvanceDto';

export interface CreateFormDataDto {
  code?: string | null;
  customer: CustomerDto;
  documentation: FormDocumentationDto;
  request: {
    comments?: string;
    exportCollectionAdvance: CustomerCleAdvanceDto;
    office: string;
  };
  savedStep: number;
}
