import { FileProps } from '../../../../types/FileProps';
import { AccountDto } from '../../AccountDto';
import { CurrencyDto } from '../../CurrencyDto';
import { CustomerDto } from '../../CustomerDto';
import { RiskLineDto } from '../../RiskLineDto';

export interface CreateFormDataDto {
  advance?: {
    advanceAmount: string;
    advanceCurrency: CurrencyDto;
    advanceExpiration: string;
    riskLine: RiskLineDto;
  };
  code?: string | null;
  creationDate?: string | null;
  customer: CustomerDto;
  documentation: {
    clientAcceptance: boolean;
    files: FileProps[];
    priority: string;
  };
  operationDetails: {
    clientReference?: string;
    collectionAmount: string;
    collectionCurrency: CurrencyDto;
    collectionType: string;
    comments?: string;
    debtorBank?: string;
    debtorName?: string;
    office?: string;
  } & (
    | {
        clientAccount: AccountDto;
        commissionAccount: AccountDto;
        hasAccount: true;
      }
    | {
        clientAccount?: null;
        commissionAccount?: null;
        hasAccount: false;
      }
  );
  savedStep: number;
  slaEnd?: string;
}
