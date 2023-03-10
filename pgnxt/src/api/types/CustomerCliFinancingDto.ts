import { AccountDto } from './AccountDto';
import { CreateFormDataDto } from './cli/financingRequest/CreateFormDataDto';
import { CustomerCliRequestDto } from './CustomerCliRequestDto';

export interface CustomerCliFinancingDto
  extends Pick<CreateFormDataDto, 'code' | 'customer' | 'creationDate'> {
  account: AccountDto;
  amount: string;
  approvalDate: string;
  contractReference: string;
  currency: string;
  expirationDate: string;
  financingReference: string;
  importCollection?: CustomerCliRequestDto;
}
