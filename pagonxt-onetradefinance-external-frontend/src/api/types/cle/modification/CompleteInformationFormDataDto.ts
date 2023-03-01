import { CustomerCleRequestDto } from '../../CustomerCleRequestDto';
import { CreateApiDataDto } from './CreateApiDataDto';

export interface CompleteInformationFormDataDto
  extends Pick<CreateApiDataDto, 'customer' | 'documentation'> {
  code: string;
  request: {
    comments: string;
    exportCollection: CustomerCleRequestDto;
    office: string;
  };
}
