import { CurrencyDto } from '../../CurrencyDto';
import { CustomerCliRequestDto } from '../../CustomerCliRequestDto';
import { CustomerDto } from '../../CustomerDto';
import { FormDocumentationDto } from '../../forms/FormDocumentationDto';

export interface CreateFormDataDto {
  code?: string | null;
  customer: CustomerDto;
  documentation: FormDocumentationDto;
  request: {
    amount: string;
    comments: string;
    currency: CurrencyDto;
    importCollection: CustomerCliRequestDto;
    office: string;
  };
  savedStep: number;
}
