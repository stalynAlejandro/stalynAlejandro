import { CurrencyDto } from '../../CurrencyDto';
import { CustomerCleRequestDto } from '../../CustomerCleRequestDto';
import { CustomerDto } from '../../CustomerDto';
import { ExchangeInsuranceDto } from '../../ExchangeInsuranceDto';
import { FormDocumentationDto } from '../../forms/FormDocumentationDto';
import { RiskLineDto } from '../../RiskLineDto';

export interface CreateFormDataDto {
  code?: string | null;
  customer: CustomerDto;
  documentation: FormDocumentationDto;
  request: {
    advanceAmount: string;
    advanceCurrency: CurrencyDto;
    comments: string;
    exchangeInsurances?: ExchangeInsuranceDto[];
    exportCollection: CustomerCleRequestDto;
    office: string;
    requestExpiration: string;
    riskLine: RiskLineDto;
  };
  savedStep: number;
}
