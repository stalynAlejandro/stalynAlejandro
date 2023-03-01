export interface ValidationErrorDto {
  fieldName: string;
  limit?: string;
  parentFieldName?: string;
  violation: string;
}
