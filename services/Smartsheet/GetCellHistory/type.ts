export interface GetCellHistoryInputs {
  sheetId: string;
  rowId: string;
  columnId: string;
  include?: string;
  pageSize?: number;
  page?: number;
  level?: number;
  outputVariable: string;
}

export interface GetCellHistoryQueryParameters {
  include?: string;
  pageSize?: number;
  page?: number;
  level?: number;
}
