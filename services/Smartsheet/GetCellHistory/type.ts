export interface GetCellHistoryInputs {
  sheetId: string;
  rowId: string;
  columnId: string;
  include?: string;
  pageSize?: number;
  page?: number;
  level?: 0 | 1 | 2;
  outputVariable: string;
}
