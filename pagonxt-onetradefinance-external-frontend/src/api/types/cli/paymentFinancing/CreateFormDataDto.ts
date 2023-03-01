import { AccountDto } from '../../AccountDto';
import { CurrencyDto } from '../../CurrencyDto';
import { CustomerDto } from '../../CustomerDto';
import { RiskLineDto } from '../../RiskLineDto';
import { CustomerCliRequestDto } from '../../CustomerCliRequestDto';
import { ExchangeInsuranceDto } from '../../ExchangeInsuranceDto';
import { FormDocumentationDto } from '../../forms/FormDocumentationDto';

export interface CreateFormDataDto {
  code?: string | null;
  creationDate?: string | null;
  customer: CustomerDto;
  documentation: FormDocumentationDto;
  request: {
    amount: string;
    clientAccount: AccountDto;
    comments: string;
    commissionAccount: AccountDto;
    currency: CurrencyDto;
    exchangeInsurances?: ExchangeInsuranceDto[];
    expirationDate?: string;
    expirationDays?: string;
    expirationType: 'date' | 'days';
    importCollection: CustomerCliRequestDto;
    office: string;
    riskLine: RiskLineDto;
  } & (
    | {
        expirationDate: string;
        expirationDays: never;
      }
    | {
        expirationDate: never;
        expirationDays: string;
      }
  );
  savedStep: number;
}
