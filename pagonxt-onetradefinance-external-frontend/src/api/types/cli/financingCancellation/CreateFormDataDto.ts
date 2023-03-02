import { AccountDto } from '../../AccountDto';
import { CurrencyDto } from '../../CurrencyDto';
import { CustomerCliFinancingDto } from '../../CustomerCliFinancingDto';
import { CustomerDto } from '../../CustomerDto';
import { FormDocumentationDto } from '../../forms/FormDocumentationDto';

export interface CreateFormDataDto {
  code?: string | null;
  customer: CustomerDto;
  documentation: FormDocumentationDto;
  request: {
    account: AccountDto;
    amount: string;
    comments: string;
    currency: CurrencyDto;
    financingRequest: CustomerCliFinancingDto;
    office: string;
  };
  savedStep: number;
}
