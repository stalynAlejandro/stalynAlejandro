import { AccountDto } from './AccountDto';
import { CreateFormDataDto } from './cli/request/CreateFormDataDto';

export interface CustomerCliRequestDto
  extends Pick<CreateFormDataDto, 'code' | 'customer' | 'creationDate'> {
  amount: string;
  approvalDate: string;
  contractReference: string;
  currency: string;
  nominalAccount: AccountDto;
}
