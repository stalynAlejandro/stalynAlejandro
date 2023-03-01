import { FileProps } from '../../../../types/FileProps';
import { AccountDto } from '../../AccountDto';
import { CurrencyDto } from '../../CurrencyDto';
import { CustomerCliRequestDto } from '../../CustomerCliRequestDto';
import { CustomerDto } from '../../CustomerDto';
import { RiskLineDto } from '../../RiskLineDto';

export interface CreateFormDataDto {
  code?: string | null;
  creationDate?: string | null;
  customer: CustomerDto;
  documentation: {
    clientAcceptance: boolean;
    files: FileProps[];
    priority: string;
  };
  request: {
    account: AccountDto;
    amount: string;
    comments: string;
    currency: CurrencyDto;
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
  slaEnd?: string;
}
