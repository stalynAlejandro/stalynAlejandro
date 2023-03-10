export interface TableApiFilterDto {
  filters?: { [key: string]: any };
  fromPage: number;
  pageSize: number;
  sortField: string;
  sortOrder: number;
}
