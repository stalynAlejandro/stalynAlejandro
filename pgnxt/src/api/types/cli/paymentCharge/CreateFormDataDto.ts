import { AccountDto } from '../../AccountDto';
import { CurrencyDto } from '../../CurrencyDto';
import { CustomerCliRequestDto } from '../../CustomerCliRequestDto';
import { CustomerDto } from '../../CustomerDto';
import { ExchangeInsuranceDto } from '../../ExchangeInsuranceDto';
import { FormDocumentationDto } from '../../forms/FormDocumentationDto';

export interface CreateFormDataDto {
  code?: string | null;
  customer: CustomerDto;
  documentation: FormDocumentationDto;
  request: {
    amount: string;
    clientAccount: AccountDto;
    comments: string;
    commissionAccount: AccountDto;
    currency: CurrencyDto;
    exchangeInsurances?: ExchangeInsuranceDto[];
    importCollection: CustomerCliRequestDto;
    office: string;
  };
  savedStep: number;
}
