export interface ListColumnsInputs {
  sheetId: string;
  level?: number;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}

export interface ListColumnsQueryParameters {
  level?: number;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
}
