export interface GetCellHistoryInputs {
  sheetId: string;
  rowId: string;
  columnId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
