export interface ApiFiltersResponseDto {
  [key: string]: {
    options?: { code: string; description: string }[] | null;
    type: string;
  };
}
