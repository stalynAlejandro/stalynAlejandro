import { AccountDto } from './AccountDto';
import { CreateFormDataDto } from './cle/request/CreateFormDataDto';

export interface CustomerCleRequestDto
  extends Pick<CreateFormDataDto, 'code' | 'customer' | 'creationDate'> {
  amount: string;
  approvalDate: string;
  contractReference: string;
  currency: string;
  nominalAccount: AccountDto;
}
