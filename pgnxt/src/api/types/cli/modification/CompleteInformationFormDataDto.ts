import { CreateFormDataDto } from './CreateFormDataDto';

export interface CompleteInformationFormDataDto
  extends Omit<CreateFormDataDto, 'savedStep'> {}
