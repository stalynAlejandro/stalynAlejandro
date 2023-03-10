import { CreateFormDataDto } from './CreateFormDataDto';

export interface CreateApiDataDto
  extends Omit<CreateFormDataDto, 'savedStep'> {}
