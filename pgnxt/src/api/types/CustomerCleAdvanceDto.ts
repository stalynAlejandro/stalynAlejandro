import { CustomerCleRequestDto } from './CustomerCleRequestDto';
import { CustomerDto } from './CustomerDto';

export interface CustomerCleAdvanceDto {
  amount: string;
  code?: string | null;
  contractReference: string;
  creationDate?: string | null;
  currency: string;
  customer: CustomerDto;
  exportCollection: CustomerCleRequestDto;
  requestExpiration?: string;
}
