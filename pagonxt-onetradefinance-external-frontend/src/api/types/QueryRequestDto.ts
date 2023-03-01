import { PendingTaskDto } from './PendingTaskDto';

export interface QueryRequestDto extends PendingTaskDto {
  contractReference: string;
  office: string;
  requestedDate: string;
  resolution: string;
}
