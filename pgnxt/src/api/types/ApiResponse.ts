export interface ApiResponse<T> {
  arguments: string[];
  entity: T;
  key: string;
  message: string | null;
  type: 'success' | 'error' | 'warning';
}
