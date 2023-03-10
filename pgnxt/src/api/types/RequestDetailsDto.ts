export interface RequestDetailsDto<T> {
  request: T & { contractReference: string; displayedStatus: string };
  requestCreationTime?: string;
  requestCreatorName?: string;
  returnComment: string;
  returnReason: string;
  taskCreationTime?: string;
}
